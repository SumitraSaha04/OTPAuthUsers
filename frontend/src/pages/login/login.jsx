import { useState } from "react";
import OtpInput from "otp-input-react";
import "./login.css";
import { auth } from "../../firebase/firebase.config";
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config";
import { getUserInfo } from "../../userInfo";

const Login = () => {
  const user=getUserInfo();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChangePhoneno = (e) => {
    setPhone(e.target.value);
  };

  function onCaptchaVerify() {
    console.log("Started Recaptcha");
    if (!window.recaptchaVerifier) {
      console.log("Started Recaptch----created");

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha Verified!", response);
          },
          "expired-callback": () => {},
        },
      );
    }
  }

  async function onSignup() {
    console.log("SIGNUP");
    if (!phone || phone.length !== 10) {
      toast.error("Please enter 10-digit phone number");
      return;
    }

    try {
      const url = "http://localhost:8080/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await response.json();
      console.log("data from login fetch", data);

      const { success, message, user } = data;

      if (success) {
        toast.success("User Already Registered!");
        localStorage.setItem("user", JSON.stringify(user));

      } else if (message == "User Not Found") {
        toast.error(message);

        navigate("/signup");
      } else if (!success) {
        toast.error(message);
        return;
      }
      console.log("User info from login.jsx---",data?.user);
      await onCaptchaVerify();

      console.log("Recaptcha completed");

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = "+91" + phone;
      console.log("phoneNumber from login.jsx", phoneNumber);

      console.log("SEND OTP");

      signInWithPhoneNumber(auth, phoneNumber,appVerifier).then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        console.log("OTP sent");
        toast.success("OTP Sent successfully");
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to initialize Captcha");
    }
  }

  async function onOTPVerify() {

    
    if (!otp || otp.length !== 6) {
      toast.error("Enter 6-digit OTP sent to valid Phone Number");
      return;
    }

    try {
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(otp);

      console.log("--Result from onOTPVerify--", result);

      const userInfo = result.user;
      toast.success("Phone verified successfully!");

      console.log("User signed in:", userInfo);
      localStorage.setItem("user", JSON.stringify(user));


      navigate("/home");
       window.location.reload(); 
    } catch (error) {
      console.error("OTP Verification failed:", error);

      toast.error("Invalid OTP. Please try again.");
    }
  }

  return (
    <>
      <div className="login-container">
        <Toaster />

        <h1>Sign in</h1>
        <div className="login-input-container">
          <button>+91</button>
          <input value={phone} onChange={handleChangePhoneno} />
        </div>
        <div className="login-otp">
          <label>Enter OTP</label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            disabled={false}
          ></OtpInput>
        </div>

        <div className="login-get-otp-btn">
          <button onClick={onSignup}>GET OTP</button>
          <button onClick={onOTPVerify}>Verify OTP</button>
        </div>
      </div>
      <div  id="recaptcha-container"></div>
    </>
  );
};

export default Login;
