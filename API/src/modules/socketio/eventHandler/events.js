const { getUser } = require("../../../services/user");
const { oldMsgList, saveMsg } = require("../../../services/message");

exports.onConnect = async (socket, userStore) => {
  try {
    let userExist = userStore.filter((i) => i.uid == socket.id);
    if (userExist.length === 0) {
      const { uid, token } = await getUser({ username: socket.username });
      userStore.push({ username: socket.username, uid, token });
      socket.broadcast.emit("users", userStore);
    }
  } catch (error) {
    console.error("Socket onConnect error: ", error);
  }
};

exports.newMsg = async (data, io) => {
  try {
    const { from, to, msg } = data;
    await saveMsg(from, to, msg);
    io.to([to.uid, from.uid]).emit("msg:new", { from, msg });
  } catch (error) {
    console.error("Socket sendMsg error: ", error);
  }
};

exports.oldMsg = async (data, io) => {
  try {
    const { from, to } = data;
    let msg = await oldMsgList(from, to);
    io.to(from.uid).emit("msg:old", msg);
  } catch (error) {
    console.error("Socket oldMsgList error: ", error);
  }
};
