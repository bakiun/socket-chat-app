const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

exports.User = mongoose.model("user", UserSchema);

const messageSchema = new Schema({}, { versionKey: false });

exports.Message = mongoose.model("message", messageSchema);
