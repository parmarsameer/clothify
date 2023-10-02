// components/StickyHeader.js

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StickyHeader = () => {
  const userId = useSelector((state) => state.userId.value);

  const [cartItem, setCartItem] = useState(0);
  useEffect(() => {
    getCartProduct();
  }, [userId]);

  async function getCartProduct() {
    try {
      if (userId) {
        const response = await axios.get(
          `http://localhost:5000/cart/user/${userId}`
        );
        // console.log(response);
        setCartItem(response.data.data.length);
        // setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
    }
  }
  return (
    <nav className="navbar sticky-top bg-body-tertiary py-3">
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand" to={"/"}>
          <b>CLOTHIFY</b>
        </Link>
        <div className="w-auto d-flex align-items-center justify-content-between">
          <ul className="navbar-nav flex-row gap-3">
            <li className="">MAN</li>
            <li>WOMAN</li>
            <li>KIDS</li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav flex-row gap-3 px-3">
            <li className="fs-5 ">
              <Link>
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>

            <li className="fs-5">
              <Link to={"/wishlist"}>
                <i className="fa-solid fa-heart"></i>
              </Link>
            </li>

            <li className="fs-5">
              <Link to={"/cart"} className="position-relative">
                <i className="fa-solid fa-bag-shopping  "></i>
                {cartItem > 0 && (
                  <span className="position-absolute translate-middle badge rounded-pill bg-danger cart-badge">
                    {cartItem}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
                {/* <span
                  className="position-absolute top-50 start-75 translate-middle bg-danger border border-light rounded-circle text-white"
                  style={{ fontSize: "12px", width: "15px", height: "15px" }}
                >
                  1
                </span> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StickyHeader;
