const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customer.route');
const countryCustomersRoutes = require('./routes/countryCustomer.routes');

// DB url
const DB_URL = 'mongodb://localhost:27017/bankDB';


const app = express();
const port = process.env.PORT || 8000;

// app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());


// connect to db
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// for old versions
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error.'))


app.use('/customers', customerRoutes);
app.use('/countryCustomers', countryCustomersRoutes);

app.use((error, req, res, next) => {
    console.log(error)
})


app.listen(port, () => {
    console.log('server running.');
});