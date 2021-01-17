const express=require("express");
const path=require("path");
const http=require("http");
const socketio=require("socket.io");
const Filter=require("bad-words");
const {generateMessage,generateLocationMessage}=require("./utils/message")
const {addUser,removeUser,getUser,getUserInRoom}=require("./utils/user")

const app=express();
const server=http.createServer(app);
const io=socketio(server);


const port=process.env.PORT||3000;
const publicDirectoryPath=path.join(__dirname,"../public")
app.use(express.static(publicDirectoryPath));

io.on("connection",(socket)=>{
  console.log("New websocket connection!");
 
  socket.on('join',({username,room},callback)=>{
    const {user,error}=addUser({id:socket.id,username,room});
    if(error){
      return callback(error)
    }
    socket.join(user.room)
    socket.emit('message',generateMessage("Admin","Welcome!"));
    socket.broadcast.to(user.room).emit('message',generateMessage( 'Admin',`${user.username} has joined!`));
    io.to(user.room).emit('roomdata',{
      room:user.room,
      users:getUserInRoom(user.room)
    })
    callback();
  })
  socket.on('sendMessage',(message,callback)=>{
    const filter=new Filter();
    const user=getUser(socket.id)
    if(filter.isProfane(message)){
      return callback("Profanity is not allowed!")
    }
    io.to(user.room).emit('message',generateMessage(user.username,message))
    callback()
  })
  socket.on('sendLocation',(location,callback)=>{
    const user=getUser(socket.id)
    io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${location.latitude},${location.longitude}`));
    callback();
  })
  socket.on('disconnect',()=>{
    const user=removeUser(socket.id)
    if(user){
      io.to(user.room).emit('message',generateMessage( "Admin",`${user.username} has left!`));
    }
    io.to(user.room).emit('roomdata',{
      room:user.room,
      users:getUserInRoom(user.room)
    })
  })
})
server.listen(port,()=>{
  console.log(`Port ${port} is listening.!`);
})