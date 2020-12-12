const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const pickRouter = require('../src/routes/realState');

function server () {
    console.log(PORT)
}
app.use('/realstate', pickRouter)

app.use('/',(req,res) => {
    res.json({message: 'ServerOn'})
})

app.listen(PORT,server)