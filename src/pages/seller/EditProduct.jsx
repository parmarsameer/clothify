import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

//Yup validation schema

// const validationSchema = yup.object({
//   productName: yup.string().required("This field Cannot be empty"),
//   description: yup.string().required("This field cannot be empty"),
//   category: yup.string().required("This field cannot be empty"),
//   gender: yup.string().required("This field cannot be empty"),
//   price: yup.string().required("This field cannot be empty"),
//   productImage: yup.string().required("This field cannot be empty"),
// });

const EditProduct = ({ id, product }) => {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [productValue, setProductValue] = useState({});

  useEffect(() => {
    console.log("use effect");
    setProductValue(product);
  });

  const initialValues = {
    //   sellerId,
    productName: "",
    description: "",
    category: "",
    gender: "",
    price: "",
    productImage: "",
  };
  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      updateProduct(values);
      // resetForm();
    },
  });

  // useEffect(() => {
  //   getProduct();
  // }, [id]);

  // const getProduct = async (id) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/product/${id}`);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //     console.log("error while fetching product");
  //   }
  // };

  const updateProduct = async (values) => {
    console.log(values);
    try {
      const response = await axios.patch(
        `http://localhost:5000/product/${id}`,
        values,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        setAlert(true);
        setAlertMsg(response.data.message);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      console.log("error while adding product");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="editProduct"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Edit product details {id}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body text-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            value={values.productName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Product Name"
          />
          <div className="validation-box">
            {errors.productName && touched.productName ? (
              <p className="form-validation-error">{errors.productName}</p>
            ) : null}
          </div>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Product description"
          />
          <div className="validation-box">
            {errors.description && touched.description ? (
              <p className="form-validation-error">{errors.description}</p>
            ) : null}
          </div>
          {/* <label htmlFor="category">Category</label> */}
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Category</option>
            <option value="shirt">Shirt</option>
            <option value="tshirt">T-Shirt</option>
            <option value="jeans">Jeans</option>
            <option value="dress">Dress</option>
          </select>
          <div className="validation-box">
            {errors.category && touched.category ? (
              <p className="form-validation-error">{errors.category}</p>
            ) : null}
          </div>
          {/* <label htmlFor="gender">Gender</label> */}
          <select
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="man">Man</option>
            <option value="women">Women</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
          <div className="validation-box">
            {errors.gender && touched.gender ? (
              <p className="form-validation-error">{errors.gender}</p>
            ) : null}
          </div>
          <input
            type="text"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Product price"
          />
          <div className="validation-box">
            {errors.price && touched.price ? (
              <p className="form-validation-error">{errors.price}</p>
            ) : null}
          </div>
          <input
            type="text"
            name="productImage"
            value={values.productImage}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Product image link"
          />
          <div className="validation-box">
            {errors.productImage && touched.productImage ? (
              <p className="form-validation-error">{errors.productImage}</p>
            ) : null}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
