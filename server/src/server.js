const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const connectDB = require("./helpers/db");

const envVariable = require("./config/index");
const { PORT } = envVariable;

const startServer = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
