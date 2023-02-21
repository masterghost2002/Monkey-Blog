const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// cors to connect with frontend
const cors = require('cors');
app.use(cors()); // cors is a function

//body-parser part
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:5000000}));

//swagger part
let options = {
    explorer: true
  }
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs_api/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

//middlewares
const contactusMail = require('./middleware/contactus');

//PORT
const PORT = process.env.PORT || 5001;

//############################################## server start

//database part
const mongoose = require('mongoose');
// will listen to part if and only if we are connected to our database
const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI).then(app.listen(PORT)).then(console.log("Connected To DB and listening to 5000")).catch((err)=>{console.log(err)});

//routes
const userRoutes = require('./routes/user-routes');
const blogRoutes = require('./routes/blog-routes');
app.use('/user', userRoutes);
app.use('/blogs', blogRoutes);
app.post('/contactus', contactusMail);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

