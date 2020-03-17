// this is the middleware function which checks for any kind of intrusions.

const {spawn} = require('child_process')

module.exports = async (req, res, next) => {

    
    // get the packet details.
    
    var packetJson = req.body.jsonFile
    var packetCSV = req.body.csvFile



    // preprocess the data

    // result of the prediction
    var result

    //spawn new child process to call the python script
    // const python = spawn('python3', ["../scripts/model/script.py"])
    // python.stdout.on('data', async (data) => {
    //     console.log('started')
    //     console.log(data.toString());
    // })

    // python.on('close', (code) => {
    //     console.log('closed')
    // })



    // run the model with the test data




    // obtain the result




    // parse the result




    // post processing




    // forward or discard packet.

    next()



}
