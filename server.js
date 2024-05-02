const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 4000
app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({ extended : true}))

app.set("view engine", "ejs")
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});


// XRPL Server
const xrpl=require('xrpl');
const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233/', {
    connectionTimeout: 1000000
});

// Connect to XRPL
client.connect().then(() => {
    console.log('Connected to XRPL Server');
}).catch((error) => {
    console.error('Failed to connect to XRPL:', error);
});
