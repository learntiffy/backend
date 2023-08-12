const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const CATEGORY = "ADMIN";

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}] : ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(label({ label: CATEGORY }), timestamp({
        format: "DD-MM-YYYY HH:mm:ss",
    }), customFormat),
    transports: [new transports.Console()],
});

module.exports = logger;