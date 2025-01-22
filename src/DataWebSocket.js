import React, { useEffect, useState } from "react";
import "./App.css";

function DataWebSocket() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Hubungkan ke server WebSocket menggunakan ws
    const wsClient = new WebSocket("ws://localhost:8080/test");

    wsClient.onopen = () => {
      console.log("Connected to WebSocket Server");
    };

    wsClient.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      const dataServer = JSON.parse(event.data);
      console.log("Data", dataServer);
    };

    wsClient.onclose = () => {
      console.log("Disconnected from WebSocket Server");
    };
    return () => {
      wsClient.close();
    };
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 className="title">Web Socket</h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <p key={index} className="message-item">
            {index + 1}. {message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DataWebSocket;
