/**
* there can be certain tasks that are CPU intensive like image processing,
* video encoding, etc.
*/
const express = require('express');
const { fork } = require('child_process');
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors());

app.get('/fib', (req, res) => {
    const { number, requestNumber } = req.query;
    console.log("handler fn ran for req", requestNumber);
    
    if (!number || isNaN(number) || number <= 0) {
        return res.status(400).json({ error: 'Please provide a valid positive number.' });
    }

    // Creating a child process
    const fiboRes = fork("./fibWorker.js");

    // Sending data to the child process
    fiboRes.send({ number: parseInt(number, 10) });
    fiboRes.on('message', (answer) => {
        console.log("sending response for req", requestNumber);
        res.status(200).json({
            status: "success",
            message: answer,
            requestNumber
        });

        // Kill the child process
        fiboRes.kill();
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
