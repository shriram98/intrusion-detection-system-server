// this file is used to create a server log file which will be constantly updated about the server functions

const fs = require('fs')

module.exports = (Message, type) => {

    var stream = fs.createWriteStream(".server_log", {flags: 'a'})

    var currentDateTime = new Date()
    
    var finalLogEntry = `[${currentDateTime}][${type}] ${Message}`

    stream.write(finalLogEntry + "\n")

    stream.end
}