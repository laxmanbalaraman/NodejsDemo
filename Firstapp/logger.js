const EventEmitter = require("events");

url = "http:/mylogger.io/mylogs";

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

module.exports = Logger;
