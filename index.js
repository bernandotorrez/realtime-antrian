const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
  });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('test', (data) => {
      console.log(data)
  })

  socket.on('antrian:update', (data) => {
    console.log(data)
    io.emit('antrian:refresh', data)
  })
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});