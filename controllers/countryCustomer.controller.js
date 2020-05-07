const CountryCustomers = require('../models/countrycustomers.model');

// country
exports.createCountry = (req, res) => {
    const country = new CountryCustomers({
        country: req.body.country,
        customers: []
    })
    country.save(err => {
        if (err) return console.log(err);
        res.status(200).json({ success: true, msg: 'Country Created Successfully.' });
    });
}

exports.getAllCountries = (req, res) => {
    CountryCustomers.find((err, data) => {
        if (err) return next(err);
        // (customersData) the same name in frontend 
        res.status(200).json({ success: true, customersData: data });
    });

}

exports.countryDetails = (req, res) => {
    const countryId = req.params.id;
    CountryCustomers.findById(countryId, (err, country) => {
        if (err) return next(err);
        res.status(200).json({ success: true, data: country });
    });
}

exports.updateCountry = (req, res) => {
    console.log(req.body);
    const countryId = req.params.id;
    CountryCustomers.findOneAndUpdate({ _id: countryId }, { $set: req.body }, (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        res.status(200).json({ success: true, msg: 'Country Updated Successfully.' });
    });
}

exports.deleteCountry = (req, res) => {
    const countryId = req.params.id;
    CountryCustomers.findByIdAndRemove(countryId, (err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, msg: 'Country Deleted Successfully.' });
    });
}

// customers

exports.addCustomer = (req, res) => {
    const countryId = req.params.id;
    CountryCustomers.findByIdAndUpdate(countryId, {
        $push: {
            customers: {
                custNo: req.body.custNo,
                custName: req.body.custName,
                title: req.body.title,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                block: false
            }
        }
    }, (err, result) => {
        if (err) return next(err);
        res.status(200).json({ success: true, msg: 'Customer Added Successfully.' });
    })
}
/*
exports.addCustomerImg = (req, res) => {
    console.log(req.body)
    const countryId = req.params.id;
    const customerId = req.params.custId;
    //let image = JSON.stringify(req.body);
    // console.log(image)
    // image = image.substr(2, image.length - 4);
    // console.log(image);

    CountryCustomers.updateOne({ _id: countryId, "customers._id": customerId },
        {
            $set: {
                "customers.$.image": req.body
            }
        }, (err, result) => {
            if (err) return console.log(err);
            res.json({ success: true, message: 'Customer Image Added successfully.' })
        })
}
*/
exports.addCustomerImg = (req, res) => {
    console.log('image' + req.body)
    const countryId = req.params.id;
    const custNo = req.params.custNo;
    // const customerId = req.params.custId;

    if (req.files) {
        req.files.image.mv('uploads/' + custNo + '.jpg', err => {
            if (err) return res.status(500).json({ success: false, error: err.message })
        })
        CountryCustomers.updateOne({ _id: countryId, "customers.custNo": custNo }, {
            $set: {
                "customers.$.image": req.files.image.data
            }
        }, (err, result) => {
            if (err) return console.log(err);
            res.status(200).json({ success: true, msg: 'Customer Image Added Successfully.' });
        })
    }
}

exports.customerDetails = (req, res) => {
    const countryId = req.params.id;
    const customerId = req.params.custId;
    CountryCustomers.find({ _id: countryId, "customers._id": customerId }, (err, customer) => {
        if (err) return next(err);
        console.log(customer)
        res.status(200).json({ success: true, data: customer });
    })
    // const query = CountryCustomers.find({ _id: countryId, "customers._id": customerId })
    // query.exec((err, customer) => {
    //     if (err) return err;
    //     console.log(customer)
    //     res.status(200).json({ success: true, data: customer });
    // })
}


exports.updateCustomer = (req, res) => {
    const countryId = req.params.id;
    const custId = req.params.custId;
    CountryCustomers.updateOne({ _id: countryId, 'customers._id': custId }, {
        $set:
        {
            "customers.$.custNo": req.body.custNo,
            "customers.$.custName": req.body.custName,
            "customers.$.title": req.body.title,
            "customers.$.email": req.body.email,
            "customers.$.phone": req.body.phone,
            "customers.$.gender": req.body.gender,
            "customers.$.block": false
        }
    }, (err, result) => {
        if (err) return next(err);
        res.status(200).json({ success: true, data: result, msg: 'Customer Updated Successfully.' });
    })
}

exports.deleteCustomer = (req, res) => {
    const countryId = req.params.id;
    const custId = req.params.custId;
    CountryCustomers.updateOne({ _id: countryId, 'customers._id': custId }, {
        $pull: {
            customers: { _id: custId }
        }
    }, { multi: false }, err => {
        if (err) return next(err);
        res.status(200).json({ success: true, msg: 'Customer Deleted Successfully.' });
    })
}

