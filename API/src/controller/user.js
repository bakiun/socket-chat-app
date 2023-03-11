const { saveUser, getUser } = require("../services/user");

exports.chatLogin = async (req, res, next) => {
  try {
    const { username } = req.body;
    let user = await getUser({ username });
    if (user && user.username == username) res.json({ status: "ok", msg: "Welcome back!", uid: user.uid, token: user.token, username: user.username });
    else {
      const { uid, token } = await saveUser(username);
      res.json({ status: "ok", msg: "User created!", uid, token, username });
    }
  } catch (error) {
    next({ status: "fail", msg: "Something went wrong!", error: error.stack });
  }
};
