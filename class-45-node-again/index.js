// 1) Exec -> can run any shell command

// const { exec } = require("child_process");

// exec('mkdir random', (err, stdout, stderr) => {
//     if (err) {
//         console.error(`exec error: ${err}`);
//         return;
//     }

//     console.log(`Number of files: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });

// 2) execFile
const { execFile } = require("child_process");

const args = ['arg1', 'arg2'];
execFile('./random.sh', args, (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});

// 3) Spawn -> generally used to run different programs

// 4) Fork -> The fork is a special case of the spawn function. It is specifically used to create a new instance
// of the node.js runtime to run a new process.