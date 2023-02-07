const io = require("socket.io")(8900, {
    cors: {
      origin: ["http://localhost:3000","http://localhost:5000"]
    },
  });
  
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
  // console.log(socket.id);
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    // console.log(userId); 
    addUser(userId, socket.id);
    // console.log(users[0]);
    io.emit("getUsers", users);
  }); 

  //send and get message
  socket.on("sendMessage", async({ senderId, recieverId, text }) => {
    const user = getUser(recieverId);
    //save msg using api with text reciever and sender id
 
 
    
    if(user){
    io.to(user.socketId).emit("getMessage", {
      id:Math.random()*10000000000000000,
     senderId:senderId,
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