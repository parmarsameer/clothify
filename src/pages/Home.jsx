import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import ShopByBrands from "../components/ShopByBrands";
import OffersCarousel from "../components/OffersCarousel";

function Home() {
  const navigate = useNavigate();
  // const [cookies, removeCookie] = useCookies([]);
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   const verifyCoockie = async () => {
  //     console.log(cookies);
  //     if (!cookies.token) {
  //       navigate("/user-login");
  //     }
  //     const response = await axios.post(
  //       "http://localhost:5000/user/verify",
  //       {},
  //       { withCredentials: true }
  //     );
  //     console.log(response);
  //     const { success, user } = response.data;
  //     return success
  //       ? setUser(user)
  //       : (removeCookie("token"), navigate("/user-login"));
  //   };
  //   verifyCoockie();
  // }, [cookies, navigate, removeCookie]);

  // const logout = () => {
  //   removeCookie("token");
  //   navigate("/user-login");
  // };
  return (
    <>
      {/* <StickyHeader onLogout={logout} userName={user.firstName} /> */}
      {/* <StickyHeader /> */}

      <OffersCarousel />

      <ShopByBrands />
      {/* <details>
        <summary>click here</summary>
        <ul>
          <li>sam</li>
          <li>mal</li>
          <li>yam</li>
        </ul>
      </details> */}
      {/* <div className="vh-100"></div> */}
    </>
  );
}

export default Home;
