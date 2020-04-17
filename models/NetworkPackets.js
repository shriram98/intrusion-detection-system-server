const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NetworkPacketSchema = new Schema({
    attack_name: {
        type: String
    },
    url: {
        type: String,
    }
})

module.exports = NetworkPackets = mongoose.model('NetworkPackets', NetworkPacketSchema)