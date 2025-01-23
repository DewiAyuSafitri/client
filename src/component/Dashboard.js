import React, { useEffect, useState } from 'react';
import createStompClient from './stompClient';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    const url = 'ws://your-websocket-url/ws'; // Ganti dengan URL STOMP WebSocket
    const topic = '/topic/data'; // endpoint opik yang akan disubscribe

    const client = createStompClient(
      url,
      (client) => {
        client.subscribe(topic, message => {
          console.log("STOMP Message", message)
          setMessages((prev) => [...prev, message.data]);
        });
      },
      (error) => {
        console.error('STOMP Connection Error:', error);
      }
    );
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  return (
    <div>
      <h1>STOMP WebSocket Dashboard</h1>
      <ol>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ol>
    </div>
  );
};

export default Dashboard;
