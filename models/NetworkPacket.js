const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NetworkPacketSchema = new Schema({
    vulnerability: {
        type: String
    },
    duration: {
        type: Number
    },
    protocol_type: {
        type: String
    },
    service: {
        type: String
    },
    flag: {
        type: String
    },
    src_bytes: {
        type: Number
    },
    dst_bytes: {
        type: Number
    },
    land: {
        type: Number
    },
    wrong_fragment: {
        type: Number
    },
    urgent: {
        type: Number
    },
    hot: {
        type: Number
    },
    num_filed_logins: {
        type: Number
    },
    logged_in: {
        type: Number
    },
    num_compromised: {
        type: Number
    },
    root_shell: {
        type: Number
    },
    su_attempted: {
        type: Number
    },
    num_root: {
        type: Number
    },
    num_file_creations: {
        type: Number
    },
    num_shells: {
        type: Number
    },
    num_access_files: {
        type: Number
    },
    num_outbound_cmds: {
        type: Number
    },
    is_host_login: {
        type: Number
    },
    is_guest_login: {
        type: Number
    },
    count: {
        type: Number
    },
    srv_count: {
        type: Number
    },
    serror_rate: {
        type: Number
    },
    srv_serror_rate: {
        type: Number
    },
    rerror_rate: {
        type: Number
    },
    srv_rerror_rate: {
        type: Number
    },
    same_srv_rate: {
        type: Number
    },
    diff_srv_date: {
        type: Number
    },
    srv_diff_host_rate: {
        type: Number
    },
    dst_host_count: {
        type: Number
    },
    dst_host_srv_count: {
        type: Number
    },
    dst_host_same_srv_rate: {
        type: Number
    },
    dst_host_diff_srv_rate: {
        type: Number
    },
    dst_host_same_src_port_rate: {
        type: Number
    },
    dst_host_srv_diff_host_rate: {
        type: Number
    },
    dst_host_serror_rate: {
        type: Number
    },
    dst_host_srv_serror_rate: {
        type: Number
    },
    dst_host_rerror_rate: {
        type: Number
    },
    dst_host_srv_rerror_rate: {
        type: Number
    },
    label: {
        type: String
    },
    level: {
        type: Number
    },
})

module.exports = NetworkPacket = mongoose.model('NetworkPacket', NetworkPacketSchema)