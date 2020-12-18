const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const pickRouter = require('./src/routes/realState');
const cors = require('cors');
// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
//   app.use(cors(corsOptions));
// app.options('*', cors()) 
app.use(cors())
function server () {
    console.log(PORT)
}
app.use('/realstate', pickRouter)

app.use('/',(req,res) => {
    // console.log(req.body)
    res.json({message: 'ServerOn'})
})

app.listen(PORT,server)

