import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartTotalMrp,
  setCartDiscount,
  setTotalAmount,
} from "../features/CartAmountSlice";

const Cart = ({ userId }) => {
  console.log(userId);
  const totalMrp = useSelector((state) => state.cartAmount.totalMrp);
  const mrpDiscount = useSelector((state) => state.cartAmount.mrpDiscount);
  const totalAmount = useSelector((state) => state.cartAmount.totalAmount);
  const dispetch = useDispatch();
  const [products, setProducts] = useState([]);
  // const [totalMrp, setTotalMrp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCartProduct();
  }, [userId]);

  async function getCartProduct() {
    try {
      const response = await axios.get(
        `http://localhost:5000/cart/user/${userId}`
      );
      // console.log(response);
      setProducts(response.data.data);
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
    }
  }

  if (products && products.length > 0) {
    // const priceArr = products.map((product) => Number(product.price));
    const totalPrice = products.reduce(
      (total, currentValue) =>
        (total = total + Number(currentValue.price) * Number(currentValue.qty)),
      0
    );
    // setTotalMrp(totalPrice);
    dispetch(setCartTotalMrp(totalPrice));
    dispetch(setCartDiscount());
    dispetch(setTotalAmount());
  }
  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${id}`);
      console.log(response);
      getCartProduct();
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
    }
  };

  const handleSelect = async (e, id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/cart/${id}`, {
        [e.target.name]: e.target.value,
      });
      console.log(response);
      getCartProduct();
    } catch (error) {
      console.error(error);
    }
  };

  return products && products.length > 0 ? (
    <div className="container d-flex p-3">
      <div className="w-75 p-5 border-end">
        {products.map((product, i) => (
          <div key={i} className="position-relative ">
            <div className="card mb-3 rounded-0">
              <div className="row g-0">
                <div className="col-md-3 ">
                  <Link to={`/brand/product/${product.productId}`}>
                    <img
                      src={product.productImage}
                      className="img-fluid"
                      alt={product.producName}
                      style={{ aspectRatio: "4/5", objectFit: "cover" }}
                    />
                  </Link>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-0 ps-2">
                    <Link
                      to={`/brand/product/${product.productId}`}
                      className="text-black"
                    >
                      <p className="mb-0">
                        <b>{product.brandName}</b>
                      </p>
                      <p className="card-text mb-2">{product.productName}</p>
                    </Link>
                    <div className="d-flex gap-4 mb-2">
                      <div
                        className="py-1 px-2 rounded"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <span>Size:</span>
                        <select
                          name="size"
                          value={product.size}
                          className="selector border-0 bg-transparent"
                          style={{ textIndent: "0px" }}
                          onChange={(e) => handleSelect(e, product._id)}
                        >
                          <option value={"S"}>S</option>
                          <option value={"M"}>M</option>
                          <option value={"L"}>L</option>
                          <option value={"XL"}>XL</option>
                        </select>
                      </div>
                      <div
                        className=" py-1 px-2 rounded"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        Qty:
                        <select
                          name="qty"
                          value={product.qty}
                          className="border-0 selector bg-transparent"
                          style={{ textIndent: "0px" }}
                          onChange={(e) => handleSelect(e, product._id)}
                        >
                          <option value={"1"}>1</option>
                          <option value={"2"}>2</option>
                          <option value={"3"}>3</option>
                          <option value={"4"}>4</option>
                          <option value={"5"}>5</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-0 item-price">
                      <span className="fw-bold px-1">
                        Rs.
                        {product.price * product.qty -
                          product.price * product.qty * 0.1}
                      </span>
                      <span className="px-1">
                        <s>₹ {product.price * product.qty}</s>
                      </span>
                      <span className="text-danger px-1">(10%)</span>
                    </div>
                    {/* <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn-close position-absolute top-0 end-0 p-2"
              onClick={() => removeFromCart(product._id)}
            ></button>
          </div>
        ))}
      </div>
      <div className="w-50 p-5">
        <div>
          <p>
            <b>COUPONES</b>
          </p>
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 font-14px fw-bold">
            <p className="m-0">Apply Coupon</p>
            <button className="btn-outline-primary py-1 px-3 text-uppercase rounded-0 fw-bold bg-white">
              Apply
            </button>
          </div>
        </div>
        <div>
          <div className="py-2 fw-bold">
            PRICE DETAILS ({products.length}
            {products.length > 1 ? "  Items" : " Item"})
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center pb-1 font-14px">
          <span>Total MRP</span>
          <span>₹{totalMrp}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center pb-1 font-14px">
          <span>Discount on MRP</span>
          <span className="text-success">-₹{mrpDiscount}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 font-14px">
          <span>Coupon Discount</span>
          <span className="">₹0</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3 font-14px fw-bold">
          <span>TOTAL AMOUNT</span>
          <span className="">₹{totalAmount}</span>
        </div>
        <div>
          <button className="w-100 btn-primary py-1 text-white">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-100 text-center text-secondary">
      <h1>Your bag is fill so light ☹</h1>
      <Link to={"/"} className="btn btn-primary mt-5">
        Add Products
      </Link>
    </div>
  );
};

export default Cart;
