import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";

const Checkout = ({ userId }) => {
  return (
    <div>
      <Routes>
        <Route path="/cart" element={<Cart userId={userId} />} />
      </Routes>
    </div>
  );
};

export default Checkout;
