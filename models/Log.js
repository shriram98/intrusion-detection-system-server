const mongoose =  require('mongoose')
const Schema =  mongoose.Schema

const LogSchema = new Schema({
    timestamp: {
        type: Date
    },
    isNotified: {
        type: Boolean
    },
    param_id: [{
        type: Schema.Types.ObjectId, 
        ref: 'NetworkPacket'
    }]
})

module.exports = Log = mongoose.model('log', LogSchema)