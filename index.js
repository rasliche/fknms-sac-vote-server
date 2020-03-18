const config = require('config')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

const port = config.get('port')
const server = app.listen(port, () => {
    console.log(`Now listening on ${port}`)
})

const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('new proposal', proposal => {
        io.emit('new proposal', proposal)
        console.log('proposal received')
    })
    socket.on('yes vote', () => {
        console.log('received yes vote event')
        io.emit('yes vote')
    })
    socket.on('no vote', () => {
        console.log('received no vote event')
        io.emit('no vote')
    })
    console.log('new user connected')
    })
