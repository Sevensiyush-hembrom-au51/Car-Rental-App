const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


// import router and controller
const Router = require('./router/router');
// const ctrl = require('./controller/cotrl')


//create Express app
const app = express();

//Configure middleware
app.use(bodyParser.json());

//Define route
app.use('/api/v1', Router);

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to mongoDB');
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

//start server
const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

