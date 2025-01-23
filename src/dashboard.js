import React, { useEffect, useState } from "react";
import createStomp from "./createStomp";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "ws://localhost:8080/test"; // Ganti dengan URL STOMP WebSocket
    const topic = "/topic/data"; // Topik untuk berlangganan

    const client = createStomp(
      url,
      (client) => {
        // Saat terkoneksi, subscribe ke topik
        client.subscribe(topic, (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });
      },
      (error) => {
        console.error("STOMP Connection Error:", error);
      }
    );

    // Bersihkan koneksi saat komponen di-unmount
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
