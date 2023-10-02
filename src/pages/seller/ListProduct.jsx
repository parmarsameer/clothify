import axios from "axios";
import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import Skeleton from "react-loading-skeleton";

function ListProduct({ sellerId }) {
  const [products, setProduct] = useState([]);
  const [updateId, setUpdateId] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    productName: "",
    description: "",
    category: "",
    gender: "",
    price: "",
    productImage: "",
  });
  console.log(updateProduct);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getProduct();
  }, [refresh]);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      const filterProduct = response.data.data.filter(
        (product) => product.sellerId === sellerId
      );
      setRefresh(1);
      setProduct(filterProduct);
      console.log(products);
    } catch (error) {
      console.error(error);
      console.log("error while fetching seller");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/${id}`
      );
      getProduct();
    } catch (error) {
      console.error(error);
      console.log("error while fetching seller");
    }
  };

  return (
    <>
      {!products.length == 0 ? (
        <div>
          <h1>Product details</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Gender</th>
                <th scope="col">Price</th>
                <th scope="col">Size</th>
                <th scope="col">Stoke</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                products
                  // .filter((product) => product.sellerId === sellerId)
                  .map((product, i) => (
                    <tr key={i}>
                      <td scope="row">{i + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>{product.gender}</td>
                      <td>{product.price}</td>
                      <td>{product.size.join(", ")}</td>
                      <td style={{ color: product.isStock ? "green" : "red" }}>
                        {product.isStock ? "In Stock" : "Out of Stock"}
                      </td>
                      <td>
                        <i
                          className="fa fa-edit text-primary"
                          style={{ cursor: "pointer" }}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#editProduct"
                          aria-controls="offcanvasRight"
                          onClick={() => {
                            setUpdateId(product._id);
                            setUpdateProduct({
                              ...updateProduct,
                              id: product._id,
                              productName: product.productName,
                              description: product.description,
                              category: product.category,
                              gender: product.gender,
                              price: product.price,
                              productImage: product.productImage,
                            });
                          }}
                        ></i>{" "}
                        &nbsp;
                        <i
                          className="fa fa-trash text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteProduct(product._id);
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))
              ) : (
                <>No product found</>
              )}
            </tbody>
          </table>
          <EditProduct id={updateId} product={updateProduct} />
        </div>
      ) : (
        <h1>No product found!</h1>
      )}
    </>
  );
}

export default ListProduct;
