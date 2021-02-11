module.exports.driverRegistrationValidation = async (req, res) => { //common to add/edit order

console.log(req.body);

    // req.check('name').exists().isLength({
    //     min: 1,


    // });

    req.check('name')
    .isString()
    .withMessage('Must be only String chars')
    .isLength({ min: 10 })
    .withMessage('Must be at least 10 chars long');

    req.check('phone_number')
    .isMobilePhone()
    .withMessage('Must be phone Number')
    .isLength({ min: 10 })
    .withMessage('Must be at least 10 chars long');
    req.check('email').exists().isLength({
        min: 1,
        
    });
    req.body.email ? req.check('email').exists().isEmail() :"";

    // req.check('phone_number').exists().isLength({
    //     min: 1
    // });
    req.check('license_number').exists().isLength({
        min: 1
    });
    req.check('car_number').exists().isLength({
        min: 1
    });


    var errors = req.validationErrors();
    return errors;
  
}
