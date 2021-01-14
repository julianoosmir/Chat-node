const express = require('express')
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});


let messagens = []
app.use('/',(req,res)=>{
    console.log("funcionou")
   
});

io.on('connection',socket=>{
    

    socket.emit('previousMessages',messagens);
    socket.on('sendMenssage',data=>{
        messagens.push(data);
        console.log(messagens)

        socket.broadcast.emit('receivedMessage',messagens);
    })
})


server.listen(3000);