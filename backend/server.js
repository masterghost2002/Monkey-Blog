const express = require('express');
const contactusMail = require('./middleware/contactus');
const app = express();

// cors to connect with frontend
const cors = require('cors');
app.use(cors()); // cors is a function

// session
let session = require("express-session");
let cookieParser = require("cookie-parser");
const oneDay = 1000*60*60*24;
app.use(session({
    secret: "This is my own secret",
    saveUninitialized: true,
    cookie: { maxAge: oneDay},
    resave: true
}));
app.use(cookieParser());


//database part
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const blogRoutes = require('./routes/blog-routes');




// body paser
app.use(express.json());



// const database = mongoose.connection;
// database.on("error", console.error.bind("Database connection failed"));
// database.once("open", ()=>{ console.log("Connected to database")});
// will listen to part if and only if we are connected to our database

mongoose.connect("")
.then(app.listen(5000)).then(console.log("Connected To DB and listening to 5000")).catch((err)=>{console.log(err)});


app.use('/user', userRoutes);
app.use('/blogs', blogRoutes);
app.post('/contactus', contactusMail)
