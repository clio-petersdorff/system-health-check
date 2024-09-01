import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css'

// Define the types for data structure
interface Services {
  redis?: boolean;
  database?: boolean;
}

interface ServerStats {
  active_connections?: number;
  wait_time?: number;
  cpu_load?: number;
}

interface RegionData {
  status?: string;
  results?: {
    services?: Services;
    stats?: {
      server?: ServerStats;
    };
  };
}

interface Data {
  [region: string]: RegionData;
}

const App: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [cpuHistories, setCpuHistories] = useState<Record<string,number[]>>({}); // State for CPU history

  const pusherKey = import.meta.env.VITE_PUSHER_KEY;

  useEffect(() => {
    // Configure Pusher client
    const pusher = new Pusher(pusherKey, {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');

    channel.bind('status-update', (update: Data) => {
      setData(update); // Update state with new data

      // Update CPU history for each region
      setCpuHistories(prevHistories => {
        const updatedHistories = { ...prevHistories };

        for (const region of Object.keys(update)) {
          const newCpuLoad = update[region]?.results?.stats?.server?.cpu_load;

          if (newCpuLoad !== undefined && newCpuLoad !== null) {
            if (!updatedHistories[region]) {
              updatedHistories[region] = [];
            }
            console.log(`Adding CPU load ${newCpuLoad} to region ${region}`); // Debugging line

            // Add new CPU load to the history
            updatedHistories[region].push(newCpuLoad);

            // Ensure history does not exceed 5 data points
            if (updatedHistories[region].length > 5) {
              updatedHistories[region].shift(); // Remove the oldest data point
            }
          }
        }

        return updatedHistories;
    });
  })

    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Service Component to render services like Redis and Database
  const Services: React.FC<Services> = ({ redis, database }) => (
    <div className= 'resultsChunk'>
      <p><span style={{'fontWeight':'bold'}}>Services:</span></p>
      <ul>
        <li>Redis: {redis?.toString() || 'waiting for update'}</li>
        <li>Database: {database?.toString() || 'waiting for update'}</li>
      </ul>
    </div>
  );

  // ServerStats Component to render server statistics
  const ServerStats: React.FC<ServerStats& { cpuHistory: number[] }> = ({ active_connections, wait_time, cpu_load, cpuHistory }) => (
    <div className= 'resultsChunk'>
      <p><span style={{'fontWeight':'bold'}}>Server:</span></p>
      <ul>
        <li><img src='./assets/global-network.png'/> Active connections: {active_connections ?? 'waiting for update'}</li>
        <li> <img src='./assets/time-left.png'/> Wait time: {wait_time ?? 'waiting for update'}</li>
        <li> <img src='./assets/cpu.png'/> CPU load time: {cpu_load ?? 'waiting for update'}</li>
      </ul>
      <div>
        <p>CPU Load History:</p>
        <ul>
          {cpuHistory.map((value, index) => (
            <li key={index}>{index + 1}: {value}</li>
          ))}
        </ul>
      </div>
    </div>
    
  );

  // Region Component that renders status, services, and server stats
  const Region: React.FC<RegionData & { cpuHistory: number[] }> = ({ status, results, cpuHistory }) => (
    <div>
      <div className={status==='ok'? "statusChunk-ok" : "statusChunk-red"}>
        <p><span style={{'fontWeight':'bold'}}>Status: </span>{status || 'waiting for status'}</p>
      </div>
      {results?.services && <Services {...results.services} />}
      {results?.stats?.server && <ServerStats {...results.stats.server} cpuHistory={cpuHistory} />}
      {}
    </div>
  );

  // Main Dashboard Component
  return (
    <div>
      <div className='header'>
        <h2>System health monitoring dashboard</h2>
      </div>
      <div id="dashboard" className="grid-container">
        {Object.keys(data).map((region: string) => (
          <div key={region} className="grid-item">
            <h3 className="regionHeader">{region}</h3>
            <Region
              status={data[region]?.status}
              results={data[region]?.results}
              cpuHistory={cpuHistories[region] || []} 
            />
          </div>
        ))}
      </div>
      <div className='statusMessage'>
        {
          <h2> All systems ok</h2>
        }
      </div>
    </div>
  );
};

export default App;
