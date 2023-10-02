import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShopByBrands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrandsData();
  }, []);

  async function getBrandsData() {
    try {
      const response = await axios.get("http://localhost:5000/seller/");
      // console.log(response);
      setBrands(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1 className="color-primary text-center pb-5">SHOP BY BRANDS</h1>
      {/* <div className="card">
        <img
          src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/7/29/e379ad0d-56ce-430d-bc60-c1cc89bc45221690609817063-JJ-_Highlander_Min_65.png"
          border={1}
        />
        <h5 className="text-center">ZARA</h5>
      </div> */}

      <div className="row row-cols-1 row-cols-md-5 g-4 mx-0 px-5 pb-5">
        {brands ? (
          brands.map((brand, i) => (
            <div className="col" key={i}>
              <Link to={`/brand/${brand._id}`}>
                <div className="card bg-light h-100 pb-0 rounded-0">
                  <div className="overflow-hidden bg-white">
                    <img
                      src={brand.profilePicture}
                      className="card-img-top brand-image"
                      alt={brand.brandName}
                    />
                  </div>
                  <div className="card-body p-0">
                    <h5 className="card-title text-center my-1">
                      {brand.brandName}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h1>No Brands Found</h1>
        )}
      </div>
    </div>
  );
};

export default ShopByBrands;
