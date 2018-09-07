// import packages
const express = require('express');
const bodyParser = require('body-parser');
const path =  require('path');

const api = require('./server/routes/api');

// initialize server port number 
const port = 3000;

// create express instance
const app = express();

// set the path where all the angular code placed & join the path current directory with dist folder
app.use(express.static(path.join(__dirname,'dist')));

/**
 * this is mainly use parser the text in url encoded data
 */
app.use(bodyParser.urlencoded({extended:true}));

/**
 * this parser the text as json
 */
app.use(bodyParser.json());


// localhost:3000/api , work this code
app.use('/api',api);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port,function(){
    console.log("Server running on localhost : "+ port);
});