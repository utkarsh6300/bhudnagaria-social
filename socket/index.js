const io = require("socket.io")(8900, {
    cors: {
      origin: ["http://localhost:3000","http://localhost:5000"]
    },
  });
  // const axios=require('axios');
  
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
 
io.on("connection", (socket) => { 
  //when ceonnect
  console.log("a user connected.");
  console.log(socket.id);
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    // console.log(userId); 
    addUser(userId, socket.id);
    // console.log(users[0]);
    io.emit("getUsers", users);
  }); 

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    //save msg using api with text reciever and sender id
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'token':user
      }
    };
    const formData={
      sender:senderId,
      receiver:receiverId,
      text:text
    };
//  try {
  
//   //  const res1 = await axios.post('http://localhost:5000/api/message/add',formData , config);
//   //  console.log(res1);
//  } catch (error) {
//   console.error(error);
//  }
 
    
    if(user){
    io.to(user.socketId).emit("getMessage", {
     id:senderId,
      data:text,
    });
  } else {
    io.to((getUser(senderId)).socketId).emit("getError", {
      msg:"other user offline"
    }); 
  }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});