// this is the middleware function which checks for any kind of intrusions.

const {spawn} = require('child_process')
const fs = require('fs')

const generateLog = require('./generate_log')
const update_server_log = require('./server_log')

module.exports = async (req, res, next) => {

    // var attackName="Neptune"
    console.log("\nPacket Recieved\n")
    update_server_log("Packet Recieved")

    // get the packet details.
    var packetCSV = req.body.csvFile

    packetName = new Date()

    fs.writeFile("../network_packets" + packetName.toISOString() + ".csv", packetCSV,"utf-8", function(err) {
        if(err)
            return console.log(err)
    })

    fs.writeFile("scripts/model/output.csv", packetCSV,"utf-8", function(err) {
        if(err)
            return console.log(err)
    })

    // preprocess the data  
    

    // result of the prediction
    var result

    console.log("\n Detecting Whether the packet is vulnerable...\n ")

    //spawn new child process to call the python script
    
    const python = spawn('python3', ["middlewares/scripts/model/script.py", packetName.toISOString() + ".csv"])
    python.stdout.on('data', async (data) => {
        result = data.toString()
        if(result == "accept"){
            console.log("\nThe packet has no vulnerability\n")
            next()
        }
        else {
            res.send("\nPacket is Vulnerable to " + result + " attack\n")
            console.log("\nPacket is Vulnerable to " + result + " attack\n")
            update_server_log("Packet is Vulnerable to " + result + " attack")
            generateLog(packetName, result)
        }
    })

    python.on('close', (code) => {
        console.log('closed')
    })

    python.stderr.on('data', (err) => {
        console.log(err.toString())
    })


}
