const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    console.log('headers', req.headers, "url", req.url, "method", req.method);
    if (req.method === "GET") {
        res.writeHead(200, {
            "COntent-Type": "text/plain"
        });
    } else if (req.method === "POST") {
        res.writeHead(200, {
            "COntent-Type": "application/json"
        });
    }
    console.log("request event");
    res.end("Hello World!");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
