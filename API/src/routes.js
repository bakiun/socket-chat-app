const express = require("express");
const router = express.Router();
const { chatLogin } = require("./controller/user");

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to Simple Chat App!" });
});

router.post("/login", chatLogin);

module.exports = router;
