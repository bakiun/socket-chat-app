const { Message, User } = require("../schemas/mongoose");

exports.oldMsgList = async (from, to) => {
  let user = (await User.findOne({ _id: from.uid })).toObject();
  if (user[to.uid]) {
    let list = (await Message.findOne({ _id: user[to.uid] })).toObject();
    delete list._id;
    return list;
  } else return [];
};

exports.saveMsg = async (from, to, msg) => {
  var user = (await User.findOne({ _id: from.uid })).toObject();
  if (user[to.uid]) await Message.updateOne({ _id: user[to.uid] }, msg, { strict: false });
  else {
    let msgCollection = new Message({});
    msgCollection = (await msgCollection.save())._id.toString();
    //TODO: Do it with transactions.
    await User.updateOne({ _id: from.uid }, { [to.uid]: msgCollection }, { strict: false });
    await User.updateOne({ _id: to.uid }, { [from.uid]: msgCollection }, { strict: false });
    await Message.updateOne({ _id: msgCollection }, msg, { strict: false });
  }
  return;
};
