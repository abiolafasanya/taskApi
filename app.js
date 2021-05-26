require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/db");
const cors = require('cors')
const PORT = process.env.PORT || 7000;
const ENV = process.env.NODE_ENV;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//Home router
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "This is the Tasks Rest Api",
    ENV
  });
});

const taskRouter = require("./router/task");
app.use("/", taskRouter);

app.listen(PORT, () => {
  console.log(`${ENV} is listening on port ${PORT}`);
});
