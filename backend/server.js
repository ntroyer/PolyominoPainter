const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

console.log('connecting to ', uri);

mongoose.connect(
    uri, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        useFindAndModify: true 
    }
).then((result) => {
    console.log('Connected to mongodb');
}).catch((error) => {
    console.log('Could not connect to mongodb: ', error);
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('we are connected to mongodb!');
});

const usersRouter = require('./routes/users');
const imagesRouter = require('./routes/images');

app.use('/users', usersRouter);
app.use('/images', imagesRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
});