// this is the middleware function which checks for any kind of intrusions.

const csvjson = require('csvjson')
const {spawn} = require('child_process')
const fs = require('fs')

const generateLog = require('./generate_log')
const update_server_log = require('../utils/server_log')

module.exports = async (req, res, next) => {

    update_server_log("New network packet recieved", "MSG")

    // get the packet details.
    var packetCSV = req.body.csvFile

    var packetJson = csvjson.toObject(packetCSV)[0];

    packetName = new Date()

    fs.writeFile("network_packets/" + packetName.toISOString() + ".csv", packetCSV,"utf-8", function(err) {
        if(err)
            return update_server_log("Not able to create packet CSV file" + err, "ERR")
    })

    // fs.writeFile("scripts/model/output.csv", packetCSV,"utf-8", function(err) {
    //     if(err)
    //         return update_server_log("Not able to fetch preprecessing information for running the model "+ err, "ERR")
    // })

    // preprocess the data  
    

    // result of the prediction
    var result

    update_server_log("Detecting Whether the packet is vulnerable...", "MSG")

    //spawn new child process to call the python script
    
    const python = spawn('python3', ["middlewares/scripts/model/script.py", packetName.toISOString() + ".csv"])
    python.stdout.on('data', async (data) => {
        result = data.toString()

        if(result.trim() === "normal"){
            update_server_log("The packet has no vulnerability", "MSG")
            next()
        }
        else {
            if(generateLog(packetJson, result)) {
                var log
                update_server_log("Packet is Vulnerable to " + result + " attack", "MSG")
                fs.readFile('.server_log', 'utf8', function(err, data) {
                    if (err) throw err;
                    var obj = {
                        message : "\nPacket is Vulnerable to " + result + " attack\n",
                        log: data,
                        isDownload: true
                    }
                    res.send(obj)
                });
            }
            else {
                res.send({
                    message: "Error Occured Resend the request",
                    isDownload: false
                })
            }
        }
    })

    python.on('close', (code) => {
        update_server_log('Python Process Closed', "MSG")
    })

    python.stderr.on('data', (err) => {
        update_server_log("Python Script Error" + err.toString(), "ERR")
    })


}
