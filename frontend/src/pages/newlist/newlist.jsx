import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import { useEffect, useState } from "react";
import "./newlist.css";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Newlist = () => {
  const { hotelId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
    image: "",
  });

  const isEdit = Boolean(hotelId); //it will change the variable to true or false based on hotelID in string format is available

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    const fetchListing = async () => {
      if (!isEdit) {
        return;
      }
      const url = `http://localhost:8080/alllistings/${hotelId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await response.json();
        if (!response.ok) {
          toast.error(`${res.message || "Failed to Prefill existing Data"}`);
          return;
        }

        if (res.success) {
          setFormData(res.data);
        }
      } catch (error) {
        console.log("Error from newlist.jsx", error);
      }
    };
    if (hotelId) {
      fetchListing();
    }
  }, [hotelId, isEdit]);

  console.log("formData from newlist.jsx", formData);

  

  const handleAddListing = async () => {
    try {
      const url = isEdit
        ? `http://localhost:8080/update/${hotelId}`
        : "http://localhost:8080/newlistings/newlist";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("FormData",formData);
      const res = await response.json();
      if (!response.ok) {
        toast.error(`${res.message}` || "Something Went Wrong");
        return;
      }
      toast.success(
        isEdit ? "Listing Updated Successfully" : "Listing Created Successfully"
      );
      navigate("/home");
    } catch (error) {
      console.log("Error in form Submiting from newlist.jsx", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="newlist-container">
        <h1>Create New Listing</h1>
        <div className="newlist-inputs">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            autoFocus
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            autoFocus
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Location"
            autoFocus
          />

          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter Image Url"
            autoFocus
          />

          <button className="add-btn" onClick={handleAddListing}>
           {isEdit?"Update":"Add"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Newlist;
