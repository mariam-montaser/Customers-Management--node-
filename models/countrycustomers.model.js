const mongoose = require('mongoose');
const countryCustomerSchema = mongoose.Schema({
    country: {
        type: String,
        required: true,
        max: 50
    },
    customers: [
        {
            custNo: {
                type: Number,
                required: true
            },
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
                required: [true, 'email is required.'],
                minLength: 20,
                maxLength: 50
            },
            phone: {
                type: String,
                required: true,
                max: 15
            },
            gender: {
                type: String,
                required: function () {
                    return this.gender == 'M' || this.gender == 'F'
                },
                max: 1
            },
            image: {
                type: Buffer
            },
            blocked: {
                type: Boolean,
                default: false
            }
        }
    ]
})


const CountryCustomer = mongoose.model('CountryCustomer', countryCustomerSchema);

module.exports = CountryCustomer;