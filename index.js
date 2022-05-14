// import third-party dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
//Serial port of Arduino
var SerialPort = require("serialport");
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: "\r\n",
});
const arduinoPort = new SerialPort("COM3", {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});
// connect port to parser
arduinoPort.pipe(parser);
//Dev env Config
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// create server for websocket
const server = require("http").createServer();
// import routes
const usersRoutes = require("./routes/Users");
const rootRoutes = require("./routes/Root");
const authRoutes = require("./routes/Auth");
const uploadRoutes = require("./routes/Upload");
// setup port
const app = express();
const port = process.env.PORT || 3010;
const socketPort = 3011;
// cors, body-parser, and file-upload
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
// use routes
app.use(rootRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
// socket connection for temp sensor
const io = require("socket.io")(server, {
  transport: ["websocket", "polling"],
  cors: {
    origin: "*",
  },
});
// io handler
io.on("connection", (client) => {
  console.log("start connect socket");
});
parser.on("data", (data) => {
  console.log("receive data", data);
  io.emit("actualTemp", data);
});
// server listen request
app.listen(port, () => {
  console.log(`server is start at http://localhost:${port}/`);
});
server.listen(socketPort);
