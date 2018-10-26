const express=require('express');
const app=express();
const db=require('./config/database');

const userRoute = require('./routes/user.routes');
const usersRoute = require('./routes/users.routes');
const newsRoute = require('./routes/news.routes');
const studRoute = require('./routes/student.route');
const fileRoute = require('./routes/file.route');
const attendanceRoute = require('./routes/attendance.route');
const notesRoute = require('./routes/notes.route');
const bodyparser = require('body-parser');
const path=require('path');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/user',userRoute);
app.use('/users',usersRoute);
app.use('/stud',studRoute);
app.use('/file',fileRoute);
app.use('/news',newsRoute);
app.use('/notes', notesRoute)
app.use('/attendance',attendanceRoute);

app.get('/test',function(req,res){
    res.json("dfsdf")
});

app.set('port',process.env.PORT || 3300);
//app.set('host', process.env.HOST || '157.119.207.186');
app.use(express.static(path.join(__dirname,'uploads')));
app.use(express.static(path.join(__dirname,'fileUploads')));
app.use(express.static(path.join(__dirname,'profilepic')));
app.listen(3300, (err)=> {
    if(err){
        console.log(err);
    }
    console.log("server connected");
});











