//middleware for role based access control(RBAC)

export const verifyAdmin=(req,res,next)=>{
    console.log("hey there: ",req);
    if(!req?.user || !req?.user?.isAdmin){
        //forbid the user from accessing
        return res.status(403).json({message:"Admins only Can access this Page",success:false})
    }
next();
}
