import { useEffect, useState } from "react";
import Navbar from "../../component/navbar/navbar.jsx";
import "./mybookings.css";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../component/footer/footer.jsx";
import BASE_URL from "../../../config.js";

export function Mybookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings
  const fetchBookings = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const userId = userInfo?.userId;
    if (!userId) return;

    try {
      const res = await fetch(`${BASE_URL}/api/alllistings/bookings/${userId}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/update/bookings/${bookingId}`,
        {
          method: "PUT", 
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({"bookingId":`${bookingId}`}),
        }
      );

      const res = await response.json();
      if (!response.ok) {
        toast.error(res.error || "Failed to Cancel Booking");
        return;
      }

      toast.success(res.message || "Booking Cancelled Successfully");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );

      setSelectedBooking((prev) =>
        prev && prev._id === bookingId ? { ...prev, status: "Cancelled" } : prev
      );
    } catch (error) {
      console.error("Error in Cancelling Booking", error);
      toast.error("Something Went Wrong");
    }
  };


  const getTotal = (checkIn, checkOut, price) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
    return { nights, totalPrice: nights * price };
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="bookings-container">
        <h2>My Bookings</h2>

        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div className="booking-card" key={b._id}>
              <img
                src={b.image }
                alt={b.title}
                className="hotel-img"
              />

              <div className="booking-info">
                <h3 className="hotel-title">{b.title}</h3>
                <p>
                  <strong>Booking ID:</strong> {b._id}
                </p>
                <p>
                  <strong>Check-In:</strong> {b.checkIn}
                </p>
                <p>
                  <strong>Check-Out:</strong> {b.checkOut}
                </p>
                <span className={`status ${b.status?.toLowerCase()}`}>
                  {b.status}
                </span>
              </div>

              <div className="booking-actions">
                <button className="btn-view" onClick={() => setSelectedBooking(b)}>
                  View Details
                </button>
                
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>

      {selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedBooking.title}</h2>
            <p>
              <strong>Booking ID:</strong> {selectedBooking._id}
            </p>
            <p>
              <strong>Check-In:</strong> {selectedBooking.checkIn}
            </p>
            <p>
              <strong>Check-Out:</strong> {selectedBooking.checkOut}
            </p>
            <p>
              <strong>Price per Night:</strong> ₹{selectedBooking.pricePerNight}
            </p>
            

            {(() => {
              const { nights, totalPrice } = getTotal(
                selectedBooking.checkIn,
                selectedBooking.checkOut,
                selectedBooking.pricePerNight
              );
              return (
                <>
                  <p>
                    <strong>Total Nights:</strong> {nights}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{totalPrice}
                  </p>
                </>
              );
            })()}

            <p>
              <strong>Status:</strong> {selectedBooking.status}
            </p>

            {selectedBooking.status !== "Cancelled" && (
              <button onClick={() => handleCancel(selectedBooking._id)}>
                Cancel Booking
              </button>
            )}
            <button onClick={() => setSelectedBooking(null)}>Close</button>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
}
