import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Wishlist = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [size, setSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSize(null);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    getWishlistProduct();
  }, [userId]);

  async function getWishlistProduct() {
    try {
      const response = await axios.get(
        `http://localhost:5000/wishlist/user/${userId}`
      );
      // console.log(response);
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const removeFromWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/wishlist/${id}`
      );
      // console.log(response);
      getWishlistProduct();
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
    try {
      if (size === null) {
        alert("please select size!");
      } else {
        handleClose();
        const response = await axios.post(`http://localhost:5000/cart/add`, {
          userId,
          productId,
          qty: 1,
          size,
        });
        // console.log("cart", response);
        if (response.data.success) {
          setProductId(null);
          setSize(null);
          alert("Item added to cart!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-center py-3">My Wishlist</h1>
      {products && products.length > 0 ? (
        <h5 className="ps-5 pb-3">
          {products.length}
          {products.length > 1 ? "  Items" : " Item"}
        </h5>
      ) : null}
      <Modal show={show} onHide={handleClose} className="text-align">
        {/* <Modal.Header closeButton>
          <Modal.Title>Select Size</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="">
          <button
            className={`size-btn ${size === "S" ? "btn-active" : ""}`}
            onClick={() => setSize("S")}
          >
            S
          </button>
          <button
            className={`size-btn ${size === "M" ? "btn-active" : ""}`}
            onClick={() => setSize("M")}
          >
            M
          </button>
          <button
            className={`size-btn ${size === "L" ? "btn-active" : ""}`}
            onClick={() => setSize("L")}
          >
            L
          </button>
          <button
            className={`size-btn ${size === "XL" ? "btn-active" : ""}`}
            onClick={() => setSize("XL")}
          >
            XL
          </button>
          <div className="d-flex justify-content-center gap-3 py-3">
            <button className="btn btn-primary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={addToCart}>
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row row-cols-1 row-cols-md-5 g-4 mx-0 px-5">
        {products && products.length ? (
          products.map((product, i) => (
            <div
              className="col position-relative p-0 m-3 wishlist-card"
              key={i}
            >
              <Link to={`/brand/product/${product.productId}`} className="">
                <div className="card p-0 h-100 rounded-0 border-0">
                  <div className="overflow-hidden">
                    <img
                      src={product.productImage}
                      className="card-img-top product-image rounded-0"
                      alt={product.productName}
                    />
                  </div>
                  <div className="card-body text-center p-0 pb-1 border">
                    <h5 className="card-title mb-0">{product.brandName}</h5>
                    <p className="mb-0">{product.productName}</p>
                    <div className="mb-0 item-price">
                      <span className="fw-bold px-1">
                        Rs.{product.price - product.price * 0.1}
                      </span>
                      <span className="px-1">
                        <s>Rs.{product.price}</s>
                      </span>
                      <span className="text-danger px-1">(10%)</span>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                className="btn btn-close position-absolute top-0 end-0 p-2"
                onClick={() => removeFromWishlist(product._id)}
              ></button>
              <button
                className="cart-btn position-absolute w-100 py-1 border"
                onClick={() => {
                  setProductId(product.productId);
                  handleShow();
                }}
              >
                ADD TO BAG
              </button>
            </div>
          ))
        ) : (
          <div className="w-100 text-center text-secondary">
            <h1>No Product Found ☹</h1>
            <Link to={"/"} className="btn btn-primary mt-5">
              Add Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
