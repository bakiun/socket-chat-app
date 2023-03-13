//# I know, this file could not be here! But this is a simple project ^_^

import { io } from "socket.io-client";

export default {
  methods: {
    connectSocket(user) {
      let socket = io(process.env.SOCKET_URL, {
        // autoConnect: false,
      });
      this.socket = socket;
      socket.id = user.uid;
      socket.auth = {
        username: user.username,
        uid: user.uid,
        token: user.token,
      };

      socket.on("users", (data) => {
        this.userList = data;
      });

      socket.on("msg:old", (data) => {
        this.msgList = data;
      });

      socket.on("msg:new", async (data) => {
        if (
          (data.from.uid == this.target.uid && data.to.uid == this.self.uid) ||
          (data.from.uid == this.self.uid && data.to.uid == this.target.uid)
        ) {
          const msgID = Object.keys(data.msg);
          this.msgList[msgID] = data.msg[msgID];
          await data;
          this.scrollToEnd();
        } else {
          this.notification = `New Message From "${data.from.username}"`;
        }
      });
    },

    sendMsg() {
      this.socket.emit("msg:new", {
        from: { username: this.self.username, uid: this.self.uid },
        to: this.target,
        msg: this.msg,
      });
      this.msg = "";
    },
  },

  watch: {
    target(val) {
      this.msgList = [];
      this.socket.emit("msg:old", { from: this.self, to: val });
    },
  },
};
