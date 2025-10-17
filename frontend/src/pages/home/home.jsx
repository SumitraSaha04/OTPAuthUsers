import { useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar/navbar";
import "./home.css";
import Footer from "../../component/footer/footer.jsx";
import { useEffect, useState } from "react";
import HotelDetailCard from "../../component/hotelDetailCard/hotelDetailCard.js";

function Home() {
  const [alllistings, setAlllistings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const url = "http://localhost:8080/alllistings";

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log("data from home.jsx get method", data);

        if (data.success) {
          setAlllistings(data.alllistings);
        }
      } catch (error) {
        console.log("Error from get api in home.jsx", error);
      }
    };
    fetchListings();
  }, []);

  
  return (
    <>
      <Navbar />

      <div className="listing-container">
        <h2>All Listings</h2>
        <div className="listings">
          {alllistings.map((listing) => {
            console.log("Home---",listing)
            const {id,image,title,price} = listing ?? {}
            return (
              // <div key={listing.id} className="listing-card">
              //   <img src={listing.image} alt={listing.title} />
              //   <h3>{listing.title}</h3>
              //   <p>{listing.price}/night</p>
              //   <button
              //     id="explore-hotel"
              //     onClick={() => navigate(`/listings/details/${listing._id}`)}
              //   >
              //     Explore Hotel
              //   </button>
              // </div>
              <HotelDetailCard id={id} image={image} title={title} price={price} onClickExploreButton={() => navigate(`/listings/details/${listing._id}`)}/>
            );
          })}
        </div>
      </div>

      <div className="footer">
       { <Footer />}
      </div>
    </>
  );
}
export default Home;
