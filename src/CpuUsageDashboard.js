import React, { useEffect, useState } from "react";

function App() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [timestamp, setTimestamp] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Hubungkan ke server WebSocket menggunakan Storm.js
    const wsClient = new WebSocket("ws://localhost:8080");

    wsClient.onopen=()=>{
      console.log("Connected to WebSocket Server")
      setIsConnected(true)
    }

    wsClient.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setCpuUsage(data.cpuUsage)
      setTimestamp(data.timestamp)
    }
   
    wsClient.onclose = () => {
      console.log("Disconnected from WebSocket Server")
      setIsConnected(false)
    }
    return()=>{
      wsClient.close();
    }
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>Real-Time CPU Usage</h1>
        <div>
            <strong>Status:</strong>{' '}
            {isConnected ? (
                <span style={{ color: 'green' }}>Connected</span>
            ) : (
                <span style={{ color: 'red' }}>Disconnected</span>
            )}
        </div>
        <div>
            <strong>CPU Usage:</strong> {cpuUsage}%{' '}
        </div>
        <div>
            <strong>Last Updated:</strong> {new Date(timestamp).toLocaleTimeString()}
        </div>
    </div>
);

}

export default App;
