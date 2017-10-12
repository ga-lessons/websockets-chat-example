// Express
const express = require('express')
const app = express()

// Socket.io
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO.listen(server)
server.listen(3001)

// Socket.io Connection
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => io.emit('chat message', msg))
  socket.on('disconnect', () => console.log('user disconnected'))
})
