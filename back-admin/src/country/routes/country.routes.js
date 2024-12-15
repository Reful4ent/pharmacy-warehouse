const Router = require('express');
const router = new Router();
const countryController = require('../contollers/country.controller');

router.post('/countries/create', countryController.createCountry)
router.get('/countries', countryController.getCountries)
router.get('/countries/:id', countryController.getOneCountry)
router.put('/countries/:id', countryController.updateCountry)
router.delete('/countries/:id', countryController.deleteCountry)


module.exports = router;