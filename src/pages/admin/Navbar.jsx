import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg pt-2 pb-0"
      style={{ height: "55px" }}
    >
      <div className="nav-body w-100 h-100 d-flex justify-content-end align-items-center pe-4 bg-secondary">
        <ul className="d-flex gap-3 mb-0 ">
          <li className="">
            <i className="bi bi-bell-fill text-decoration-none"></i>
          </li>
          <li>
            <Link className=" text-decoration-none text-black">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
