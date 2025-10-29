
import dotenv from "dotenv";
import Razorpay from "razorpay";



const razorpay=new Razorpay({
    key_id:process.env.RazorPay_id,
    key_secret:process.env.RazorPay_secret,
});

export const order=async(req,res)=>{
    try{
        const{amount}=req.body;

        const options={
            amount:amount,
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
        };

        const orderDetails=await razorpay.orders.create(options);
        res.json(orderDetails);
    }catch(error){
        console.log("Error from createOrder.js",error);
        res.status(500).json({message:"Failed to create order"});
    }
}