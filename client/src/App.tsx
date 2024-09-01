
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const App: React.FC = () => {
  // const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<object>({});

  const pusherKey = import.meta.env.VITE_PUSHER_KEY
  
  useEffect(() => {
    // Configure Pusher client
    const pusher = new Pusher(pusherKey, {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');

    channel.bind('status-update', (update:object) => {
      setData(update); // Update state with new data
    });

    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="container text-center">
      <h1>System health</h1>
      <div id = 'dashboard' className="row align-items-start">
          {
            Object.keys(data).map((region:string) => (
              <div key = {region} className='col' style={{border:'1px solid black', margin:'0.2rem'}}>
                <h3 id = 'regionHeader'>{region}</h3>
                <div>
                  <p>Status: {data[region]?.status ||'waiting for status'}</p>
                  <p>Services:</p> 
                  <ul>
                    <li>Redis:{data[region]?.results?.services?.redis || 'waiting for update'} </li>  
                    <li>Database:{data[region]?.results?.services?.database || 'waiting for update'} </li>  
                  </ul>
                  <p>Server:</p>
                  <ul>
                    <li>Active connections:{data[region]?.results?.stats?.server?.active_connections} </li>
                    <li>Wait time: {data[region]?.results?.stats?.server?.wait_time}</li>
                  </ul>
                  <p>CPU load time: {data[region]?.results?.stats?.server?.cpu_load || 'waiting for update'}</p>
                </div>
                {/* <pre>{JSON.stringify(data[region], null, 2)}</pre> */}
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default App;

/**
 * Status
 * Region
 * 
 * Results: Services
 * Results: Stats
 * 
 * Results:Stats:Server:CPU_load
 */