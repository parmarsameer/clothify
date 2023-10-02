import React from "react";
import { Link } from "react-router-dom";

function SellerSidebar({ seller }) {
  return (
    <div className="seller-sidebar bg-secondary">
      <h3 className="p-2 mb-5">Clothify</h3>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="brand-dp d-flex justify-content-center align-items-center overflow-hidden">
          <img
            src={seller.profilePicture}
            alt="display picture"
            className="brand-image"
          />
        </div>
        <p>
          <b>{seller.brandName}</b>
        </p>
      </div>
      <hr />
      <ul className="ps-0">
        <li className="side-item p-2">
          <Link to={"/seller/"}>
            <i className="fa-solid fa-house"></i> Dashboard
          </Link>
        </li>
        <li className="side-item p-2">
          <Link
            className="text-decoration-none d-block dropdown-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#collapseProduct"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i className="fa-solid fa-boxes-packing"></i> Products
          </Link>
          <div
            className="collapse ms-4 p-2"
            id="collapseProduct"
            style={{ backgroundColor: "#ccc", borderRadius: "5px" }}
          >
            <ul className="ps-2">
              <li className="sub-item p-1">
                <Link
                  to={"/seller/add-product"}
                  className="text-decoration-none d-block"
                >
                  Add Product
                </Link>
              </li>
              <li className="sub-item p-1">
                <Link
                  to={"/seller/products"}
                  className="text-decoration-none d-block"
                >
                  List Products
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="side-item p-2">
          <Link to={"/seller/orders"}>
            <i className="fa-solid fa-table-cells"></i> Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SellerSidebar;
