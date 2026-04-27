/**
* there can be certain tasks that are CPU intensive like image processing,
* video encoding, etc.
*/
const express = require('express');
const cors = require("cors");
const app = express();

// serial and parallel
function calculateFibonacci(number) {
   if (number <= 1) {
       return number;
   }
   return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
}

app.use(express.static("public"));
app.use(cors());


app.get('/fib', (req, res) => {
   const { number, requestNumber } = req.query;
   console.log("handler fn ran for req", requestNumber);
   if (!number || isNaN(number) || number <= 0) {
       return res.status(400).json({ error: 'Please provide a valid positive number.' });
   }
   const answer = calculateFibonacci(number);
   // console.log(answer);
   res.status(200).json({
       status: "success",
       message: answer,
       requestNumber
   })
});


app.listen(3000, () => {
   console.log('Server is running on port 3000');
});
