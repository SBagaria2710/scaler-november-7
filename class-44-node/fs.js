const fs = require('fs');
const path = require('path');

// create a file
fs.writeFile( 'file.txt', 'hello world', (err) => {
   if(err) throw err;
   console.log("data written to file");
})
// add content to the file
fs.appendFile('file.txt', 'some more text', (err) => {
   if(err) throw err;
   console.log("data appended to file");
})
// read the file
fs.readFile('file.txt', (err, data) => {
   if(err) throw err;
   console.log(data.toString());
})
// create a directory
fs.mkdir('newDir', (err) => {
   if(err) throw err;
   console.log("Directory created");
})
// create another directory
fs.mkdir(path.join(__dirname,'newDir2'), (err) => {
   if(err) throw err;
   console.log("Directory created");
})