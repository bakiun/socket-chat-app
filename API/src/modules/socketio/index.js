// const io = require("socket.io")(httpServer);
const { Server } = require("socket.io");
const checkSocket = require("./middleware");
const eventHandler = require("./eventHandler");
const { userList } = require("../../services/user");

var userStore = []; //# like REDIS store

exports.createSocket = async (expressServer) => {
  const io = new Server(expressServer, { cors: { origin: "*" } });
  userStore = await userList();

  io.use(async (socket, next) => {
    try {
      const authorize = await checkSocket(socket);
      if (authorize) return next();
      else next(new Error("Authorization fail"));
    } catch (error) {
      console.error("Socket middleware error: ", error);
      next(new Error("Authorization fail with error"));
    }
  });

  io.on("connection", (socket) => eventHandler(io, socket, userStore));
  return;
};
