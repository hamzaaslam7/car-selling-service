const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
carModel: {
    type: String,
    minlength: [3, "min 3 character"],
    required: [true, "Car Model is required"],
  },
  price: {
    type: Number,
    required: [true, "Car Price is required"],
  },
  phone: {
    type: Number,
    maxlength: [11, "please enter the correct number"],
    required: true,
  },
  city: {
    type: String,
    required: [true, "Car city is required"],
  },
  noOfCopy:{
    type: Number,
    min: [1, 'Copy must be greater then 0'],
    max: [10, 'Copy must be less then 10'],
  },
  picture:{
    type: Array
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required:[true,'Car must belong to a User']
}
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
