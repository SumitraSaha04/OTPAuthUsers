import Listing from "../model/listings.js";

export const newlist = async (req, res) => {
  try {
    const { title, price,description,location ,image} = req.body;
    const list = {
      title: title,
      price: price,
      description:description,
      location:location,
      image: image,
    };

    const newlisting = await Listing.create(list);

    res.status(201).json({
      message: "Successfully added newlisting",
      success: true,
      newlist: newlisting,
    });
  } catch (error) {
    console.log("Error from authnewlist.js", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error from authnewlist.js",
      });
  }
};
