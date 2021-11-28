require('dotenv').config();
const express = require('express');
const port = 8005;
const db = require('./server/config/mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./server/routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server up on ${port}`);
});