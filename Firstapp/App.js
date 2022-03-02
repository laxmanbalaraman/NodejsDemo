// console.log("Hello World");

const Logger = require("./Logger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("message");
