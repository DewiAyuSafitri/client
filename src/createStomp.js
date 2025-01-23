import { Client } from '@stomp/stompjs';

const createStomp = (url, onConnect, onError) => {
  const client = new Client({
    brokerURL: url,
    debug: (str) => {
      console.log("TEST ",str); // Debug log
    },
    onConnect: (frame) => {
      console.log('Connected to STOMP:', frame);
      if (onConnect) onConnect(client, frame);
    },
    onStompError: (frame) => {
      console.error('STOMP Error:', frame);
      if (onError) onError(frame);
    },
  });

  client.activate(); // Mengaktifkan koneksi
  return client;
};

export default createStomp;
