const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const userRouter = require("./router/userRoutes");
const authRouter = require("./router/authRoutes");

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.use("/user", userRouter);
app.use("/auth", authRouter);

module.exports = app;
