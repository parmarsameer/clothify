import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsByBrands = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/seller/${params.id}`
      );
      console.log(response);
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1 className="color-primary text-center p-5">SHOP BY BRANDS</h1>
      <div className="d-flex justify-content-between px-5">
        <p>{products.length} items found</p>
        <div>
          <label>SORT BY</label>
          <select className="form-control w-auto d-inline mx-2">
            <option value="">Relevance</option>
            <option value="">Price (Highest first)</option>
            <option value="">Price (lowest first)</option>
            <option value="">Discount</option>
            <option value="">What&apos;s New</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-5 g-4 mx-0 px-5">
        {products.length ? (
          products.map((product, i) => (
            <div className="col" key={i}>
              <Link to={`/brand/product/${product._id}`}>
                <div className="card h-100">
                  <div className="overflow-hidden">
                    <img
                      src={product.productImage}
                      className="card-img-top product-image"
                      alt={product.productName}
                    />
                  </div>
                  <div className="card-body p-0">
                    <h5 className="card-title">{product.brandName}</h5>
                    <p className="mb-0">{product.productName}</p>
                    <p className="mb-0 fw-bold">Rs.{product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h1>No Product Found</h1>
        )}
      </div>
    </div>
  );
};

export default ProductsByBrands;
