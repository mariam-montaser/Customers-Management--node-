const express = require('express');

const countryCustomersController = require('../controllers/countryCustomer.controller');


const router = express.Router();

router.post('/createCountry', countryCustomersController.createCountry);
// get method (sometimes) need params (:any)
// router.get('/getCountries/:all', countryCustomersController.getAllCountries);
router.get('/getCountries', countryCustomersController.getAllCountries);
router.get('/:id', countryCustomersController.countryDetails);
router.put('/updateCountry/:id', countryCustomersController.updateCountry);
router.delete('/deleteCountry/:id', countryCustomersController.deleteCountry);

router.put('/:id/addCustomer', countryCustomersController.addCustomer);
// router.put('/:id/addCustomerImg/:custId', countryCustomersController.addCustomerImg);
router.put('/:id/addCustomerImg/:custNo', countryCustomersController.addCustomerImg);
router.put('/:id/updateCustomer/:custId', countryCustomersController.updateCustomer);
router.delete('/:id/deleteCustomer/:custId', countryCustomersController.deleteCustomer);
router.get('/:id/getCustomer/:custId', countryCustomersController.customerDetails);



module.exports = router;