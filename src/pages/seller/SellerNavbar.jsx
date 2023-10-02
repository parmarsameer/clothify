import { Link } from "react-router-dom";

function SellerNavbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="ms-auto p-2 pe-4">
        <ul className="d-flex gap-3 mb-0 ">
          <li className="">
            <i className="bi bi-bell-fill text-decoration-none"></i>
          </li>
          <li>
            <a className="text-black" onClick={onLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SellerNavbar;
