import "../../pages/home/home.css";
const HotelDetailCard=({id,image,title,price,onClickExploreButton}:HotelDetailCardTypes)=>{
    return(

        <div className="listing-card">

         <div key={id} className="card">
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>Rs. {price}/night</p>
                <button
                  id="explore-hotel"
                  onClick={onClickExploreButton}
                >
                  Explore Hotel
                </button>
              </div>
        </div>

    );
}
export default HotelDetailCard;
type HotelDetailCardTypes={
    id:string|number,
    image:string,
    title:string,
    price:number,
    onClickExploreButton:()=> void

}

