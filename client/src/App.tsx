
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
    <div>
      <h1>System health</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : 'Waiting for data...'}</pre>
    </div>
  );
};

export default App;
