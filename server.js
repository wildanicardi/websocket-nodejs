// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898, () => {
  console.log('opened server on', server.address().port);
});
const wsServer = new WebSocketServer({
  httpServer: server
});
wsServer.on('request', function (request) {
  const connection = request.accept(null, request.origin);
  connection.on('notification', function (message) {
    console.log('Received notification:', message.utf8Data);
    connection.sendUTF('Hi this is WebSocket server!');
  });
  connection.on('close', function (reasonCode, description) {
    console.log('Client has disconnected.');
  });
});

