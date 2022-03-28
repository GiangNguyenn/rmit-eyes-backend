// import third-party dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// import routes
const usersRoutes = require('./routes/Users');
const rootRoutes = require('./routes/Root');
const authRoutes = require('./routes/Auth');
const uploadRoutes = require('./routes/Upload');
// setup port
const app = express();
const port = process.env.PORT || 3002;
// cors, body-parser, and file-upload
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
// use routes
app.use(rootRoutes)
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)
app.use('/upload', uploadRoutes)
// server listen request
app.listen(port, () => {
    console.log(`server is start at http://localhost:${port}/`);
})
