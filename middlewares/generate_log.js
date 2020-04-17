const NetworkPackets = require('../models/NetworkPackets')
const Log = require('../models/Log')

const update_server_log = require('../utils/server_log')

module.exports = (url, attack_name) => {

    let errorFlag = false

    // add the packet to the network packet table.
    let packetId
    
    const packetData = {
        attack_name,
        url
    }

    NetworkPackets.create(packetData)
        .then(packet => {
            packetId = packet._id
            update_server_log("Network Packet Url Saved to the database", "MSG")
        })
        .catch(err => {
            update_server_log("Error Occured while upadating Network Packet Information", "ERR")
            errorFlag = true
        })

    // generate log entry in in log table

    if(errorFlag == false) {
        update_server_log("Error Occured; Resend the request; No Database changes made", "ERR")
        console.log("Error occured while processing.\n Rerun the request again")
        return false
    }

    let updateFlag = false

    const logData = {
        timestamp: new Date(),
        isNotified: true,
        param_id: packetId
    }

    Log.create(logData)
        .then(log => {
            update_server_log("Log Entry Successfully Created", "MSG")
        })
        .catch(err => {
            update_server_log("Error occured while updating the log : " + err, "ERR")
            console.log(err)
            updateFlag = true
        })

    if(updateFlag == true) {
        return false
    }

    return true
}