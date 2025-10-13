import mongoose from "mongoose";

const listingSchema=new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String,

    
})

const Listing=mongoose.model("Listing",listingSchema);

export default Listing;