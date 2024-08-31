import express from 'express';
// import routes from './server';

const app = express();
const port = 3000;

app.use(express.json());
// app.use('/', routes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

import Pusher from "pusher";
import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });

// fetch data from api
app.get('/status', async (req, res) => {
    console.log('Fetching data...')
    try {
        const response = await fetch('https://data--us-east.upscope.io/status?stats=1')
        const data = await response.json()
        console.log(data.results)

        // Trigger Pusher event with the fetched data
        pusher.trigger('my-channel', 'status-update', data);
        res.status(200).send('Data pushed');

    } catch(e){
        res.status(500).send({error: e.message})
    }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

 