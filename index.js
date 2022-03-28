// import third-party dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const { Client } = require('pg')
// import routes
const usersRoutes = require('./routes/Users');
const rootRoutes = require('./routes/Root');
const authRoutes = require('./routes/Auth');

// setup port and db
dotenv.config()
const databaseConfig = {
    ssl: {
        rejectUnauthorized: false
    },
    connectionString: process.env.DB_CONNECTION_STRING
};

const app = express();
const port = process.env.PORT || 3002;
const database = new Client(databaseConfig)
database.connect()
// cors
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// use routes
app.use(rootRoutes)
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)
// server listen request
app.listen(port, () => {
    console.log(`server is start at http://localhost:${port}/`);
})
