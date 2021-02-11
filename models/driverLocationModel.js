const mongoose =require('mongoose');

const driverLocationSchema = new mongoose.Schema({
  latitude: { type: String, required: true },

  longitude: { type: String, required: true },
  driver_id:{ type: String, required: true }
});

module.exports = mongoose.model('DriverLoication', driverLocationSchema);

// export default driverModel;
