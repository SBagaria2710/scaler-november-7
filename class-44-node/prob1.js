// const fs = require("fs");

/**
 * PROBLEM STATEMENT - 1
 * 1. Copy a large file in the folder
 * 2. If you want to generate large files with code
 */

// Generate random content
// const content = Math.random().toString(36).repeat(10000000); // Approx. 130MB

// Write the content to the file
// fs.writeFileSync(`${__dirname}/bigfile.txt`, content);

const http = require('http');
const fs = require("fs");

const server = http.createServer();
server.on("request", (req, res) => {
    fs.readFile("./bigfile.txt", (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Server started at 3000");
});

// ANSWER: Streaming

