const express = require('express');
const app = express();
const cors = require('cors');
const contactusMail = require('./middleware/contactus');
require('dotenv').config()
// cors to connect with frontend
app.use(cors()); // cors is a function
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:5000000}));


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
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
.then(app.listen(PORT)).then(console.log("Connected To DB and listening to 5000")).catch((err)=>{console.log(err)});
app.use('/user', userRoutes);
app.use('/blogs', blogRoutes);
app.post('/contactus', contactusMail)

