const chalk = require("chalk")

module.exports.l = (msg) => {
    console.log(msg)
}

module.exports.e = (msg) => {
    console.log(chalk.redBright(msg))
}

module.exports.w = (msg) => {
    console.log(chalk.yellowBright(msg))
}