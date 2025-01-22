import React, { useEffect, useState } from "react";

function DataWebSocket() {

  useEffect(() => {
    // Hubungkan ke server WebSocket menggunakan ws
    const wsClient = new WebSocket("ws://localhost:8080");

    wsClient.onopen = () => {
      console.log("Connected to WebSocket Server");
    };

    wsClient.onmessage = (event) => {
      const dataServer = JSON.parse(event.data);
          console.log("Data", dataServer)
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
      <h1>Web Socket</h1>
    </div>
  );
}

export default DataWebSocket;
