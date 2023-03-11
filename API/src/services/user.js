const { User } = require("../schemas/mongoose");

exports.getUser = async (filter) => {
  let user = await User.findOne(filter);
  if (user) {
    const { _id, token, username } = user;
    return { uid: _id.toString(), token, username };
  } else return null;
};

exports.saveUser = async (username) => {
  let token = (Math.random() + 1).toString(36).substring(2); //# or use JWT
  let user = new User({ username, token });
  user = await user.save();
  return { uid: user._id.toString(), token };
};

exports.userList = async () => {
  let users = await User.find({});
  return users.map((i) => (i = { uid: i._id.toString(), username: i.username }));
};
