require('dotenv').config();
const express = require('express');
const port = 8080;
const path = require('path');
const db = require('./server/config/mongoose');
const Task = require('./server/models/task')

const app = express();

app.use(express.static('./server/assets'));


app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'server/views'));
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./server/routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server up on ${port}`);
});