import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

function ListSeller() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getSeller();
  }, []);

  const getSeller = async () => {
    try {
      const response = await axios.get("http://localhost:5000/seller");
      setSellers(response.data.data);
    } catch (error) {
      console.error(error);
      console.log("error while fetching seller");
    }
  };
  return (
    <div>
      <h1>Seller details</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Owner name</th>
            <th scope="col">Brand name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {sellers ? (
            sellers.map((seller, i) => (
              <tr key={i}>
                <td scope="row">{i + 1}</td>
                <td>{seller.ownerName}</td>
                <td>{seller.brandName}</td>
                <td>{seller.email}</td>
                <td>
                  <i className="fa fa-edit"></i> &nbsp;
                  <i className="fa fa-trash"></i>
                </td>
              </tr>
            ))
          ) : (
            <>No seller found</>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListSeller;
