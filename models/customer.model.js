const mongoose = require('mongoose');



const customerScheme = mongoose.Schema({
    custName: {
        type: String,
        required: true,
        max: 100
    },
    title: {
        type: String,
        required: false,
        max: 4
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    phone: {
        type: String,
        required: true,
        max: 15
    }
})

const Customer = mongoose.model('Customer', customerScheme);


module.exports = Customer;