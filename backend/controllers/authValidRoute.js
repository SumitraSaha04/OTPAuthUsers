import Listing from "../model/listings.js";
import Booking from "../model/booking.js";
import User from "../model/user.js";
export const listings = async (req, res) => {
  const alllistings = await Listing.find();
  return res.status(200).json({
    message: "List of hotels fetched",
    success: true,
    alllistings: alllistings,
  });
};

export const getSingle = async (req, res) => {
  const { hotelId } = req.params;
  console.log("HotelId from backend authValidate.jsx--", hotelId);
  const hotel = await Listing.findById(hotelId);
  console.log("hotel from getSingle authValidRoute---",hotel)
  try {
    return res.status(200).json({
      message: "Hotel fetched",
      success: true,
      data: hotel,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteHotel = async (req, res) => {
  const { deleteHotelid } = req.params;

  console.log("delete hotel id", deleteHotelid);

  const data = await Listing.findByIdAndDelete(deleteHotelid);

  try {
    if (data) {
      res.status(200).json({ message: "Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const booking = async (req, res) => {
  try {
    const {
      userId,
      hotelId,
      title,
      pricePerNight,
      nights,
      totalPrice,
      checkIn,
      checkOut,
      paymentId,
    } = req.body;

    if (!userId || !hotelId || !checkIn || !checkOut || !paymentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!hotelId) {
      return res.status(404).json({ message: "Hotel Not Found" });
    }
    const hotelDetail = await Listing.findById(hotelId);
    const newBooking = new Booking({
      userId,
      hotelId,
      title,
      pricePerNight,
      nights,
      totalPrice,
      checkIn,
      checkOut,
      paymentId,
      image: hotelDetail?.image,
      status: "Confirmed",
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      message: "Booking saved successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return res.status(500).json({
      message: "Booking could not be saved! Please try again.",
      error: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ success: false, message: "User Not LoggedIn !" });
      return;
    }
    const bookings = await Booking.find({ userId: userId });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log("Error in getBookings data fetching", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req?.body?.bookingId;
    console.log("bookingId from cancelBooking", bookingId);

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { status: "Cancelled" } },
      { new: true }
    );

    if (!booking) {
      return res.status(400).json({
        message: "Something Went Wrong! Booking couldn't be cancelled",
      });
    }

    return res.status(200).json({
      message: "Booking Cancelled Successfully",
      success: true,
      booking: booking,
    });
  } catch (error) {
    console.log("Error Cancelling booking", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const makeAdmins = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.isAdmin = true;
  await user.save();

  return res.status(200).json({ message: "You are now an Admin" });
};

export const update = async (req,res) => {
  try {
    const { hotelId } = req.params;
    const data = req.body;

    const updatedHotel = await Listing.findByIdAndUpdate({_id:hotelId}, data, {
      new: true,
    });
    console.log("updatedListing from authValid.js", updatedHotel);

    if (updatedHotel) {
      res.status(200).json({
        message: "Data Updated Successfully",
        success: true,
        updatedHotel: updatedHotel,
      });
    } else {
      res.status(404).json({ success: false, message: "Hotel Not Found" });
    }
  } catch (error) {
    console.log("Error in updating Hotel from authValidRoute", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      err,
    });
  }
};
