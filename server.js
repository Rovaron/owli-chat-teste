const server = require('./app');
const connectDB = require('./db')
const port = process.env.PORT || '3000'
const mongoose = require('mongoose')
const message = require('./models/Message')

connectDB()
  .then(() => { console.log('Connected to DB cluster') })
  .catch((error) => { console.log('Error connecting to DB: ', error) })

const httpServer = server.listen(port, () => {
  console.log('Server running on port: ', port)
})

const io = require('socket.io').listen(httpServer)

const usersOnline = []
const usersSocket = {}
const messages = []

io.on('connection', (socket) => {
  console.log('socket connected: ', socket.id)
  
  socket.on('userLogin', (user) =>{
    socket.user = user
    usersSocket[user._id] = socket
    usersOnline.push(user)
    io.emit('usersUpdated', usersOnline)
  })

  socket.on('privateMessage', (message) => {
    messages.push(message)
    socket.emit('privateMessage', message)
    usersSocket[message.to].emit('privateMessage', message)
  })

  socket.on('requestMessages', (users) => {
    console.log('pediu mensagens')
    const filteredMessages = messages.filter((message) => {
      return (message.from === users.owner_id && message.to === users.target_id) || (message.from === users.target_id && message.to === users.owner_id)
    })
    console.log(filteredMessages)
    socket.emit('loadMessages', filteredMessages)
  })

  socket.on('disconnect', () => {
    const indexToRemove = usersOnline.findIndex(user => user === socket.user)
    if (indexToRemove > -1) {
      usersOnline.splice(indexToRemove, 1)
      io.emit('usersUpdated', usersOnline)
    }
  })
})
