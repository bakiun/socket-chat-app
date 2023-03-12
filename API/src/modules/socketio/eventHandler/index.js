const event = require("./events");

module.exports = async (io, socket, userStore) => {
  await event.onConnect(socket, userStore);
  socket.emit("users", userStore);

  //# Sockets
  socket.on("msg:new", async (data) => event.newMsg(data, io));
  socket.on("msg:old", (data) => event.oldMsg(data, io));
};
