const path = require("path");
const http =  require("http");
const express = require("express");
const socketIO = require("socket.io");
var app = express();
const publicpath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;
app.use(express.static(publicpath));
var server =  http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
   console.log("New user connected");


   socket.on('createMsg',(newMsg)=>{
       console.log('createMsg',newMsg);
       io.emit('newMessage',{
           from:newMsg.from,
           text:newMsg.text,
           createdAt:new Date().getTime()
       });
   });
   
   socket.on('disconnect',()=>{
    console.log("Client disconnected");
 });
});

server.listen(port,()=>{
  console.log("server is started");
});