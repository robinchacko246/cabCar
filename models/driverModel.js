const mongoose =require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  phone_number: { type: String, required: true ,unique: true,},
  license_number: { type: String, required: true ,unique: true,},
  car_number: { type: String, required: true ,unique: true,},
});

module.exports = mongoose.model('Driver', driverSchema);

// export default driverModel;
