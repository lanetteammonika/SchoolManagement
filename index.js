const express=require('express');
const app=express();
const db=require('./config/database');

const usersRoute = require('./routes/users.routes');
const newsRoute = require('./routes/news.routes');
const attendanceRoute = require('./routes/attendance.route');
const notesRoute = require('./routes/notes.route');
const complaintsRoute = require('./routes/complaint.route');

const bodyparser = require('body-parser');
const path=require('path');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/users',usersRoute);
app.use('/news',newsRoute);
app.use('/notes', notesRoute)
app.use('/attendance',attendanceRoute);
app.use('/complaint',complaintsRoute);

app.get('/test',function(req,res){
    res.json("dfsdf")
});

app.set('port',process.env.PORT || 3300);
//app.set('host', process.env.HOST || '157.119.207.186');

app.use(express.static(path.join(__dirname,'profilepic')));
app.listen(3300, (err)=> {
    if(err){
        console.log(err);
    }
    console.log("server connected");
});











