import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import SellerNavbar from "./SellerNavbar";
import SellerSidebar from "./SellerSidebar";
import SellerHome from "./SellerHome";
import AddProduct from "./AddProduct";
import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";

function SellerDashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [seller, setSeller] = useState("");

  useEffect(() => {
    const verifyCoockie = async () => {
      // console.log(cookies.token);
      if (!cookies.token) {
        console.log("not token");
        navigate("/seller-login");
      }
      const response = await axios.post(
        "http://localhost:5000/seller/verify",
        {},
        { withCredentials: true }
      );
      console.log(response);
      const { success, seller } = response.data;
      return success
        ? setSeller(seller)
        : (removeCookie("token"), navigate("/seller-login"));
    };
    verifyCoockie();
  }, [cookies, navigate, removeCookie]);

  // useEffect(()=>{
  //   const getSellerInfo = async () => {
  //     const response = await axios.get(`http://localhost:5000/seller/${seller.id}`)
  //     console.log();
  //   }
  // })

  const logout = () => {
    removeCookie("token");
    navigate("/seller-login");
  };

  return (
    <div className="d-flex">
      <SellerSidebar seller={seller} />
      <div className="seller-db-main-content">
        <SellerNavbar onLogout={logout} />
        <Routes>
          <Route exect path="" element={<SellerHome />} />
          <Route
            exect
            path="add-product"
            element={
              <AddProduct sellerId={seller._id} brandName={seller.brandName} />
            }
          />
          <Route
            exect
            path="products"
            element={<ListProduct sellerId={seller._id} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default SellerDashboard;
