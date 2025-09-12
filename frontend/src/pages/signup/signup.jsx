import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./signup.css"

const Signup = () => {
    const [signupInfo,setSignupInfo]=useState({
        name:"",
        phoneNumber:"",
        email:"",
    })
    const navigate=useNavigate();

    function handleChange(e){
        const{name,value}=e.target;
        console.log(name,value);

        const copySignupInfo={...signupInfo}
        copySignupInfo[name]=value;

        setSignupInfo(copySignupInfo);

        console.log("SignupInfo->",copySignupInfo);
    }

   async function handleSignup(){
        const{name,phoneNumber,email}=signupInfo;//taking out info from this object
        console.log("signupInfo at Signup",signupInfo);

        if(!name ||!phoneNumber ||!email){
            console.log("All Input Fields must be field");
            toast.error("All Input Fields must be field");
            return;
        }

        try{
            const url="http://localhost:8080/auth/signup";
            const response=await fetch(url,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(signupInfo)
            })
            const result=await response.json();
            console.log("Response from signup backend",result);

            const {success,message,error,user}=result;
            if(success){
                toast.success(message);
                localStorage.setItem("user",JSON.stringify(user));
                setTimeout(()=>{
                    navigate("/home")
                },3000);
                
            }else if(error){
                console.log("Error from signup backend",error)
                toast.error("Error from signup backend");
                return;
            }else if(!success){
                
                toast.error(message);
            }

        }catch(error){
            console.log("Error from catch block of signup backend",error);
            toast.error(error)
        }


    }
  return (
    <>
      <div className="signup-container">
        <Toaster/>
        <h1>Signup</h1>
        <div className="signup-input-container">
          <label htmlFor="name">Enter Name</label>
          <input
           type="text"
           value={signupInfo.name}
           onChange={handleChange}
           placeholder="Enter Name"
           autoFocus
           name="name"
           ></input>

          <label htmlFor="phone">Mobile No.</label>
          <input
        
          type="number"
          value={signupInfo.phoneNumber}
          onChange={handleChange}
          placeholder="+91"
          autoFocus
          name="phoneNumber"
          ></input>

          <label htmlFor="email">Enter Email</label>
          <input
          type="email"
          value={signupInfo.email}
          onChange={handleChange}
          placeholder="Enter Email Address"
          autoFocus
          name="email"></input>
        </div>

        <div className="signup-button">
            <button
            onClick={handleSignup}>Signup</button>

        </div>
      </div>
    </>
  );
};

export default Signup;
