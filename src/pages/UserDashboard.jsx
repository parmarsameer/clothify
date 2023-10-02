import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductsByBrands from "../components/ProductsByBrands";
import StickyHeader from "../components/StickyHeader";
import ProductDetails from "../components/ProductDetails";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../features/UserIdSlice";
import Checkout from "./Checkout";

const UserDashboard = () => {
  const userId = useSelector((state) => state.userId.value);
  // console.log("user-id", userId);
  const dispetch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const verifyCoockie = async () => {
      // console.log(cookies);
      if (!cookies.token) {
        console.log("no token found!");
        navigate("/user-login");
      }
      const response = await axios.post(
        "http://localhost:5000/user/verify",
        {},
        { withCredentials: true }
      );
      // console.log(response);
      const { success, user } = response.data;
      return success
        ? (setUser(user), dispetch(setUserId(user._id)))
        : (removeCookie("token"), navigate("/user-login"));
    };
    verifyCoockie();
  }, [cookies, navigate, removeCookie]);

  // const logout = () => {
  //   removeCookie("token");
  //   navigate("/user-login");
  // };

  return (
    <div>
      <StickyHeader />
      <Routes>
        <Route path="" exect element={<Home />} />
        <Route exect path="/brand/:id" element={<ProductsByBrands />} />
        <Route
          exect
          path="/brand/product/:id"
          element={<ProductDetails userId={user._id} />}
        />
        <Route
          exect
          path="/wishlist"
          element={<Wishlist userId={user._id} />}
        />
        <Route
          exect
          path="/checkout/*"
          element={<Checkout userId={user._id} />}
        />
        <Route exect path="/cart" element={<Cart userId={user._id} />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
