const WebSocket = require('ws');
const http = require('http');
const server = http.createServer();
const wss = new WebSocket.Server({ server, clientTracking: true });

app.use(express.json());

app.get("/ping", (req, res) =>
{
  res.send("pong");

});


wss.on('connection', (ws, req) =>
{
  // WebSocket connection established
  const noteId = req.url.substring(1); console.log('New WebSocket connection');

  // Access the set of connected clients
  console.log(`Number of connected clients for ${noteId}: ${wss.clients.size}`);

  // Iterate over connected clients
  wss.clients.forEach((client) =>
  {
    // Perform actions on each connected client
    console.log(`Client IP: ${client._socket.remoteAddress}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>
{
  console.log(`Server is listening on port ${PORT}`);
});
