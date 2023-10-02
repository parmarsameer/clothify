import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  const [showText, setShowText] = useState(!collapsed);
  const handleToggle = () => {
    onToggleSidebar();
    setShowText(!showText);
  };
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn bg-secondary" onClick={handleToggle}>
        {collapsed ? (
          <i className="fa-solid fa-shirt"></i>
        ) : (
          <>
            <i className="fa-solid fa-shirt " />
            &nbsp;{showText && <b>Clothify</b>}
          </>
        )}
      </button>
      <ul>
        <li>
          <Link to={"/admin"} className="text-decoration-none d-block">
            {collapsed ? (
              <i className="fa-solid fa-house"></i>
            ) : (
              <>
                <i className="fa-solid fa-house" />
                &nbsp;{showText && <span>Dashboard</span>}
              </>
            )}
          </Link>
        </li>
        <li>
          <Link
            to={"/admin"}
            className="text-decoration-none d-block"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSeller"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {collapsed ? (
              <i className="fa-solid fa-handshake"></i>
            ) : (
              <>
                <i className="fa-solid fa-handshake" />
                &nbsp;{showText && <span>Seller</span>}
              </>
            )}
          </Link>
          <div className="collapse ps-3 " id="collapseSeller">
            <ul>
              <li className="py-0">
                <Link
                  to={"/admin/add-seller"}
                  className="text-decoration-none d-block"
                >
                  Add Seller
                </Link>
              </li>
              <li className="py-0">
                <Link
                  to={"/admin/list-sellers"}
                  className="text-decoration-none d-block"
                >
                  List Seller
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <Link
            to={"/admin"}
            className="text-decoration-none d-block"
            data-bs-toggle="collapse"
            data-bs-target="#collapseUser"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {collapsed ? (
              <i className="fa-solid fa-users"></i>
            ) : (
              <>
                <i className="fa-solid fa-users" />
                &nbsp;{showText && <span>Users</span>}
              </>
            )}
          </Link>
          <div className="collapse ps-3" id="collapseUser">
            <ul>
              <li className="py-0">
                <Link to={"/admin"} className="text-decoration-none d-block">
                  Add Seller
                </Link>
              </li>
              <li className="py-0">
                <Link to={"/admin"} className="text-decoration-none d-block">
                  List Seller
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to={"/admin"} className="text-decoration-none d-block">
            {collapsed ? (
              <i className="fa-solid fa-boxes-packing"></i>
            ) : (
              <>
                <i className="fa-solid fa-boxes-packing"></i>
                &nbsp;{showText && <span>Products</span>}
              </>
            )}
          </Link>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
