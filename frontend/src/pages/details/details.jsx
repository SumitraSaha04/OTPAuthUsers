import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./details.css";
import toast, { Toaster } from "react-hot-toast";
import { addDays } from "date-fns";
import BASE_URL from "../../../config";


export function Details() {
  const { hotelId } = useParams();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from details.jsx--",user);

  const navigate = useNavigate();
  console.log("BASE_URL----",BASE_URL);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/alllistings/${hotelId}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const res = await response.json();
        if (!response.ok) {
          toast.error(`${res.message}`);
          return;
        }
        if (res.success) {
          setHotelDetail(res.data);
        }
      } catch (error) {
        console.log("Error from details.jsx", error);
      }
    };

    if (hotelId) {
      fetchHotelData();
    }
  }, [hotelId]);

  async function handleDelete() {
    const url = `${BASE_URL}/api/deletelistings/${hotelId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    const res = await response.json();

    if (!response.ok) {
      toast.error(res.message || "Failed to delete");
      return;
    }

    toast.success(res.message);
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }

  const handleEdit = () => {
    navigate(`/listings/new/edit/${hotelId}`);
  };

  return (
    <>
      <div className="details-container">
        {user?.isAdmin && (
          <div className="action-buttons">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}

        <div className="image-container">
          {hotelDetail?.image && (
            <img src={hotelDetail?.image} alt={hotelDetail?.title} />
          )}
        </div>

        <div className="details-info">
          <div>
            <h1>{hotelDetail?.title}</h1>
            <div className="price">
              <h2>Rs. {hotelDetail?.price}/night</h2>
            </div>
            <h3>{hotelDetail?.description}</h3>

            <h4>📌{hotelDetail?.location}</h4>
          </div>

          <button
            className="reserve-btn"
            onClick={() => {
              navigate("/reserve", { state: { hotelDetail, dateRange } });
            }}
          >
            Reserve
          </button>
        </div>
      </div>

      <Toaster />
    </>
  );
}
