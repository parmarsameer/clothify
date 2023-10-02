import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetails = ({ userId }) => {
  const [product, setProduct] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [description, setDescription] = useState([]);
  const [selectSize, setSelectSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const params = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setSizes(product.size);
    const desc = product.description ? product.description.split(".") : [];
    // console.log(desc);
    setDescription(desc);
    isProductWishlisted();
  }, [product]);

  async function getProducts() {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${params.id}`
      );
      // console.log(response);
      setProduct(response.data.data);
      isProductWishlisted();
    } catch (error) {
      console.error(error);
    }
  }

  async function isProductWishlisted() {
    try {
      const response = await axios.post(
        `http://localhost:5000/wishlist/is-wishlisted`,
        { userId, productId: product._id }
      );
      // console.log("wishlist", response);
      setIsWishlisted(response.data.wishlisted);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectSize = (size) => {
    setSelectSize(size);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/wishlist/add", {
        sellerId: product.sellerId,
        productId: product._id,
        userId,
        brandName: product.brandName,
        productName: product.productName,
        price: product.price,
        productImage: product.productImage,
        isStock: product.isStock,
      });
      console.log(response);
      if (response.data.success) {
        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
    try {
      if (selectSize === null) {
        alert("please select size!");
      } else {
        const response = await axios.post(`http://localhost:5000/cart/add`, {
          userId,
          productId: product._id,
          qty: 1,
          size: selectSize,
        });
        console.log("cart", response);
        if (response.data.success) {
          alert("Item added to cart!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-5">
      <div className="row row-cols-md-2 row-cols-sm-1 gx-0">
        <div className="col d-flex justify-content-center product-details-left">
          <img
            src={product.productImage}
            alt={product.productName}
            className="product-image d-block product-detail-image"
          />
        </div>
        <div className="col product-details-right">
          <h3 className="m-0">{product.brandName || <Skeleton />}</h3>
          <p className="fs-5">{product.productName || <Skeleton />}</p>
          <hr />
          <div className="d-flex align-items-center gap-3">
            <p className="fs-4">₹{product.price - product.price * 0.1}</p>
            <p className="fs-4 fw-light">
              MRP <s>{product.price}</s>
            </p>
            <p className="fs-4 text-danger">(10% OFF)</p>
          </div>

          <p className="fw-bold mb-1">SELECT SIZE</p>
          {sizes &&
            sizes.map((size, i) => (
              <button
                className={`size-btn ${
                  selectSize === size ? "btn-active" : ""
                }`}
                key={i}
                onClick={() => handleSelectSize(size)}
              >
                {size}
              </button>
            ))}

          <div className="py-5">
            <button
              className="btn btn-primary text-uppercase mx-2"
              onClick={addToCart}
            >
              <i className="fa-solid fa-bag-shopping"></i>&nbsp;ADD TO BAG
            </button>

            {isWishlisted ? (
              <button
                className="btn btn-outline-primary disabled text-uppercase mx-2"
                onClick={handleClick}
              >
                <i className="fa-solid fa-heart"></i>&nbsp;WISHLISTED
              </button>
            ) : (
              <button
                className="btn btn-outline-primary text-uppercase mx-2"
                onClick={handleClick}
              >
                <i className="fa-regular fa-heart"></i>&nbsp;WISHLIST
              </button>
            )}
          </div>

          <p className="fw-bold mb-0">PRODUCT DETAILS</p>
          <p>
            {description
              ? description.map((desc, i) => <li key={i}>{desc}</li>) || (
                  <Skeleton count={3} />
                )
              : product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
