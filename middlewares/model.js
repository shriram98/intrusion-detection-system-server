// this is the middleware function which checks for any kind of intrusions.

const {spawn} = require('child_process')
const fs = require('fs')

const generateLog = require('./generate_log')

module.exports = async (req, res, next) => {

    var attackName="Neptune"
    
    console.log("\nPacket Recieved\n")

    // get the packet details.

    var packetJson = req.body.jsonFile
    var packetCSV = req.body.csvFile

    packetName = new Date()

    fs.writeFile(packetName.toISOString() +".csv", packetCSV,"utf-8", function(err) {
        if(err)
            return console.log(err)
    })

    // preprocess the data  
    

    // result of the prediction
    var result

    console.log("\n Detecting Whether the packet is vulnerable...\n ")

    //spawn new child process to call the python script
    const python = spawn('python3', ["middlewares/scripts/model/script.py"])
    python.stdout.on('data', async (data) => {
        result = data.toString()
        if(result == "accept"){
            console.log("\nThe packet has no vulnerability\n")
            next()
        }
        else {
            res.send("\nPacket is Vulnerable to " + attackName + " attack\n")
            console.log("\nPacket is Vulnerable to " + attackName + " attack\n")
            generateLog(packetName)
        }
    })

    python.on('close', (code) => {
        console.log('closed')
    })

    python.stderr.on('data', (err) => {
        console.log(err.toString())
    })


}
