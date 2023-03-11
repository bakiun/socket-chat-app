const { getUser } = require("../../services/user");

//# Authorize

module.exports = async (socket) => {
  const { username, uid, token } = socket.handshake.auth;
  socket.username = username;
  socket.id = uid;
  let user = await getUser({ _id: socket.id });

  if (token && user && user.uid == uid && user.token == token) return true;
  else return false;
};
