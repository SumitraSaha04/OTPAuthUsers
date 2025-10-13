import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hotelId: { type: String, required: true },
  title: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  nights:{type:Number,required:true},
  totalPrice:{type:Number,required:true},
  checkIn: {
    type: String,
    required: true,
  },
  location:{
    type:String,
   

  },
  checkOut: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  image:{
    type:String,
   
  }
  ,
  status:{
    type:String,
    required:true,
    default:"Confirmed",
  }
  
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;