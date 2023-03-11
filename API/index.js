require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./src/config");
const routes = require("./src/routes");
const mongoose = require("mongoose");
const { createSocket } = require("./src/modules/socketio");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Error 404, Not found!" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error });
});

const expressServer = app.listen(config.port, async () => {
  await mongoose.connect(config.mongoDBUrl);
  createSocket(expressServer);
  console.log(`Listening on http://${config.ip}:${config.port}`);
});
