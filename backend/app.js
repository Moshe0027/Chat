const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://127.0.0.1:5173']
    }
})

io.on('connection', socket => {
    socket.on('message', (massage) => {
        socket.emit('receive_message', massage);
    })
})

