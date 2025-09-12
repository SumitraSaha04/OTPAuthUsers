import  mongoose from "mongoose";

//Now ,form a schema and then model and then export the model
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:Number,
});

//create a model
const User=mongoose.model("User",userSchema);

export default User;
    


