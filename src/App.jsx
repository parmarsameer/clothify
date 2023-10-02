import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegistration from "./pages/UserRegistration";
import SellerLogIn from "./pages/seller/sellerLogIn";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import ProductsByBrands from "./components/ProductsByBrands";
import ProductDetails from "./components/ProductDetails";
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <>
      <Routes>
        {/* <Route exect path="/" element={<Home />} /> */}
        <Route exect path="/*" element={<UserDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route exect path="/admin/*" element={<AdminDashboard />} />
        <Route path="/seller-login" element={<SellerLogIn />} />
        <Route exect path="/seller/*" element={<SellerDashboard />} />
        {/* <Route exect path="/brand/:id" element={<ProductsByBrands />} /> */}
        {/* <Route exect path="/brand/product/:id" element={<ProductDetails />} /> */}
      </Routes>
    </>
  );
}

export default App;
