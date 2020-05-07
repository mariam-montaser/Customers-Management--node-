const Customer = require('../models/customer.model');

exports.test = (req, res) => {
    res.send('<h1>Custemers Page</h1>')
    console.log('controller works.')
}

exports.createCustomer = (req, res) => {
    const customer = new Customer({
        custName: req.body.name,
        title: req.body.title,
        email: req.body.email,
        phone: req.body.phone
    });

    customer.save(err => {
        if (err) {
            return next(err)
        }
        res.send('Customer Created Successfully.');
    });
}

exports.customerDetails = (req, res) => {
    const customerId = req.params.id;
    Customer.findById(customerId, (err, customer) => {
        if (err) return next(err)
        console.log(customer)
        res.send(customer)
    })
}

exports.updateCustomer = (req, res) => {
    const customerId = req.params.id;
    Customer.findOneAndUpdate(customerId, { $set: req.body }, (err, result) => {
        if (err) return next(err);
        console.log(result);
        res.send('Customer Updated.');
    })
}

exports.deleteCustomer = (req, res) => {
    const customerId = req.params.id;
    Customer.findOneAndDelete(customerId, err => {
        if (err) return next(err);
        res.send('Customer Deleted.');
    })
}