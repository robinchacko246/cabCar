var express = require("express");
var router = express.Router();
const driverValidate = require("../validation/driverRegistrationValidation");
var Driver = require("../models/driverModel");
var DriverLocation = require("../models/driverLocationModel");
const haversine = require("haversine-distance");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/v1/driver/register/", async function (req, res, next) {
  try {
    console.log("req.body", req.body);
    /*************************************backend validation****************************************************** */
    let errors = await driverValidate.driverRegistrationValidation(req, res); //backend validation
    if (errors != false) {
      return res.status(400).json({
        success: true,
        message: "Bad Request ! Please Check Your Inputs",
        data: {},
        errors: errors,
      });
    }
    /*************************************end backend validation****************************************************** */

    /*****************************************INSIDE ADD NEW DRIVER CONTROLLER******************************************/
    const Driver1 = new Driver({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      license_number: req.body.license_number,
      car_number: req.body.car_number,
    });
    const newUser = await Driver1.save();
    res.status(200).send(newUser);

    /*****************************************INSIDE ADD NEW DRIVER CONTROLLER******************************************/
  } catch (error) {
    console.log("error", error);

    return res.status(400).json({
      success: true,
      message: "error occured!",
      data: {},
      errors: error,
    });
  }
});

router.post("/api/v1/driver/:id/sendLocation/",
  async function (req, res, next) {
    try {
      console.log("req.body", req.body);

      /*****************************************INSIDE ADD NEW DRIVER location CONTROLLER******************************************/
      const Driver2 = new DriverLocation({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        driver_id: req.params.id,
      });
      const driverLocation = await Driver2.save();
      res.status(200).send(driverLocation);

      /*****************************************INSIDE ADD NEW DRIVER location CONTROLLER******************************************/
    } catch (error) {
      console.log("error", error);

      return res.status(400).json({
        success: true,
        message: "error occured!",
        data: {},
        errors: error,
      });
    }
  }
);

router.get(
  "/api/v1/passenger/available_cabs/",
  async function (req, res, next) {
    try {
      console.log("req.bo", req.body);
      const getUserLocation = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };

      const DriverLoication1 = await DriverLocation.find();
 

      console.log("all drivers location details",DriverLoication1);
      
      let driverDetails = [];
      DriverLoication1.forEach((DriverLoication11) => {
        console.log("first", DriverLoication11.longitude);
        const driversLocation = {
          latitude: DriverLoication11.latitude,
          longitude: DriverLoication11.longitude,
        };

        let distance = haversine(getUserLocation, driversLocation);
        if (distance / 1000 <= 4) {
          driverDetails.push(DriverLoication11.driver_id);
        }
      });
      console.log("drver details", driverDetails);
     
       let  i = 0;
      let data = [];

      const DriverInfo = await Driver.find();
      DriverInfo.forEach((DriverInfo1) => {
        console.log("adsad", DriverInfo1._id);

        if (DriverInfo1._id == driverDetails[i]) {
          let jsonActivity = [
            {
              name: DriverInfo1.name,
              phone_number: DriverInfo1.phone_number,
              car_number: DriverInfo1.car_number,
            },
          ];
          data = data.concat(jsonActivity);
          i++;
        }
      });


      console.log("data",data.length);
      
      if (data.length == 0) {
        console.log("inside 0");
        
        return res.status(400).json({
          success: true,
          message: "No cabs available!",
          data: {}
         
        });
      }
      else
      {
        res.status(200).json(data);

       
      }
      
    } catch (error) {
      console.log("error", error);

      return res.status(400).json({
        success: true,
        message: "error occured!",
        data: {},
        errors: error,
      });
    }
  }
);
module.exports = router;
