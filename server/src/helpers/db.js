const mongoose = require("mongoose");
const envVariable = require("../config/index");
const { DB_URI } = envVariable;

const connectDB = async () => {
  await mongoose
    .connect(DB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch(() => console.log("Database connection failed"));
};

module.exports = connectDB;
