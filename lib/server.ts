import app from "./app";
const logger = require("./winston/winston");
const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Express server listening on port : ${PORT}`)
    // console.log('Express server listening on port ' + PORT);
})