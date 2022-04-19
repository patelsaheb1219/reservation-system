const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ['single', 'double'],
    default: 'single',
  },
  fromDate: {
    type: Date,
    required: [true, "Please select from date"]
  },
  toDate: {
    type: Date,
    required: [true, "Please select to date"]
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  extraFacilities: {
    type: [String]
  }
});

module.exports = mongoose.model("reservation",ReservationSchema);