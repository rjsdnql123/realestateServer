const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const pickRouter = require('./src/routes/realState');
const cors = require('cors');
var corsOptions = {
    origin: "http://apartment-deploy.s3-website.ap-northeast-2.amazonaws.com/"
  };
  
  app.use(cors(corsOptions));
function server () {
    console.log(PORT)
}
app.use('/realstate', pickRouter)

app.use('/',(req,res) => {
    // console.log(req.body)
    res.json({message: 'ServerOn'})
})

app.listen(PORT,server)

