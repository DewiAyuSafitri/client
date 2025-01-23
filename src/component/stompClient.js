import { Client } from '@stomp/stompjs';

const createStompClient = (url, onConnect, onError) => {
  const client = new Client({
    brokerURL: url,
    onConnect: (frame) => {
      console.log('Connected to STOMP:', frame);
      if (onConnect) onConnect(client, frame);
    },
    onStompError: (frame) => {
      console.error('STOMP Error:', frame);
      if (onError) onError(frame);
    },
  });

  client.activate();
  return client;

  
};

export default createStompClient;
