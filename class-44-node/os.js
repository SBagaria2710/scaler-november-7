const os = require('os');

console.log("arch",os.arch());
console.log("cpus",os.cpus());
console.log("freemem",os.freemem()); // In bytes
console.log("platform",os.platform());
console.log("release",os.release());