import express from 'express';
const router = express.Router()
import Pusher from "pusher";
import fetch from 'node-fetch';

require("dotenv").config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });


// fetch data from api
router.get('/status', async (req, res) => {
    console.log('Fetching data...')
    try {
        const response = await fetch('https://data--us-east.upscope.io/status?stats=1')
        console.log(response)
        const data = await response.json()

        // Trigger Pusher event with the fetched data
        pusher.trigger('my-channel', 'status-update', data);
        res.status(200).send('Data fetched and pushed to Pusher!');

    } catch(e){
        res.status(500).send({error: e.message})
    }
})

router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route working');
  });

export default router;