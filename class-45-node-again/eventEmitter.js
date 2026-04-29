const eventEmitter = require('events');
const myEmitter = new eventEmitter();

// Handler/Listener
myEmitter.on('myEvent', (...args) => {
    console.log("There is a new event!", args);
});

myEmitter.on('myEvent', (...args) => {
    console.log("another listener for the new event", args);
    console.log("--------");
});

// Throw/Emit Events
myEmitter.emit("myEvent");
myEmitter.emit("myEvent", 1, 2);
myEmitter.emit("myEvent", [1, 2, 3]);