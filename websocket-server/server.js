const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));
});

app.server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

