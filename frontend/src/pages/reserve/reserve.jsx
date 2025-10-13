import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import toast from "react-hot-toast";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./reserve.css";
import Footer from "../../component/footer/footer";
import Navbar from "../../component/navbar/navbar";

export function Reserve() {
  const location = useLocation();
  const navigate = useNavigate();

  const { hotelDetail } = location.state || {};
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
  };

  const handlePayment = async () => {
    if (!hotelDetail) {
      toast.error("Missing hotel details");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const userId = userInfo?.userId;

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const checkIn = format(dateRange[0].startDate, "yyyy-MM-dd");
    const checkOut = format(dateRange[0].endDate, "yyyy-MM-dd");

    const nights = calculateNights(
      dateRange[0].startDate,
      dateRange[0].endDate
    );
    const totalAmount = hotelDetail.price * nights;

    try {
      const response = await fetch(
        "http://localhost:8080/newlistings/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount * 100 }), 
        }
      );

      if (!response.ok) throw new Error("Order creation failed");

      const order = await response.json();

      // Step 2: Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_RMCjzj2zhsQIAt", // Replace with your Razorpay key
          amount: order.amount,
          currency: order.currency,
          name: "Wandurlust",
          description: `${hotelDetail.title} - ${nights} Nights`,
          order_id: order.id,
          handler: async function (res) {
            toast.success("Payment Successful");

            try {
              // Step 3: Save booking to backend
              const bookingData = {
                userId,
                hotelId: hotelDetail._id,
                title: hotelDetail.title,
                pricePerNight: hotelDetail.price,
                image: hotelDetail.image,
                checkIn,
                checkOut,
                paymentId: res.razorpay_payment_id,
                status: "Confirmed",
                nights, 
                totalPrice: totalAmount , 
              };

              console.log("Booking Payload →", bookingData);

              const bookingRes = await fetch(
                `http://localhost:8080/newlistings/bookings/${userId}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(bookingData),
                }
              );

              if (!bookingRes.ok) {
                const errMsg = await bookingRes.text();
                throw new Error(errMsg || "Booking failed");
              }

              toast.success("Booking Saved");
              navigate(`/mybookings`);
            } catch (error) {
              console.error("Error in saving booking:", error);
              toast.error("Booking could not be saved!");
            }
          },
          prefill: {
            name: userInfo?.name || "Guest User",
            email: userInfo?.email || "guest@example.com",
            contact: userInfo?.phoneNumber || "9999999999",
          },
          theme: { color: "#2563eb" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
    } catch (error) {
      console.error("Error in handlePayment:", error);
      toast.error("Something went wrong! Try again");
    }
  };

  return (
    <div className="parent-conatiner">
      <Navbar/>
       <div className="reserve-container">

      <div className="reserve-card">
        <h1 className="reserve-title">Confirm Your Reservation</h1>

        <div className="reserve-details">
          <img
            src={hotelDetail?.image || "/placeholder.jpg"}
            alt={hotelDetail?.title || "Hotel"}
            className="reserve-image"
          />
          <div className="reserve-info">
            <h2>{hotelDetail?.title || "Hotel"}</h2>

  
            <p>
              <b>Check-In:</b> {format(dateRange[0].startDate, "yyyy-MM-dd")}
            </p>
            <p>
              <b>Check-Out:</b> {format(dateRange[0].endDate, "yyyy-MM-dd")}
            </p>
            <p className="reserve-price">
              ₹{hotelDetail?.price || "N/A"} / night
            </p>

          
            <p>
              <b>Total:</b> ₹
              {hotelDetail?.price
                ? hotelDetail.price *
                  calculateNights(dateRange[0].startDate, dateRange[0].endDate)
                : "N/A"}
            </p>
          </div>
        </div>

        
        <div className="reserve-calendar">
          <DateRange
            editableDateInputs={false}
            showDateDisplay={false}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            minDate={new Date()} // prevent past dates
          />
        </div>

        <div className="reserve-action">
          <button onClick={handlePayment} className="reserve-btn">
            Pay & Confirm Booking
          </button>
        </div>
      </div>
  
    </div>

      <Footer/>

    </div>
    
   
  );
}
