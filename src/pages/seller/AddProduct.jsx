import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

//Yup validation schema

const validationSchema = yup.object({
  productName: yup.string().required("This field Cannot be empty"),
  description: yup.string().required("This field cannot be empty"),
  category: yup.string().required("This field cannot be empty"),
  gender: yup.string().required("This field cannot be empty"),
  size: yup
    .array()
    .required("This field cannot be empty")
    .min(1, "This field cannot be empty"),
  price: yup.string().required("This field cannot be empty"),
  productImage: yup.string().required("This field cannot be empty"),
});

function AddProduct({ sellerId, brandName }) {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const initialValues = {
    productName: "",
    description: "",
    category: "",
    gender: "",
    size: [],
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
    validationSchema,
    onSubmit: (values) => {
      const product = {
        ...values,
        sellerId,
        brandName,
      };
      // console.log(product);
      addProduct(product);
      // resetForm();
    },
  });

  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/product/add-product",
        { product },
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
    <>
      {alert && (
        <div
          className="alert bg-success d-flex gap-5 text-white position-absolute p-2.5"
          role="alert"
        >
          {/* <i className="bi bi-check-circle px-2"></i> */}
          <div>{alertMsg}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            onClick={() => setAlert(false)}
          ></button>
        </div>
      )}
      <div className="p-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            className="form-control w-auto"
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
            className="form-control w-auto"
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
          <label htmlFor="category">Category</label>
          <select
            name="category"
            className="form-control w-auto"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Category&nbsp;</option>
            <option value="shirt">Shirt</option>
            <option value="tshirt">T-Shirt</option>
            <option value="jeans">Jeans</option>
            <option value="dress">Dress</option>
            <option value="track suit">Track suit</option>
          </select>
          <div className="validation-box">
            {errors.category && touched.category ? (
              <p className="form-validation-error">{errors.category}</p>
            ) : null}
          </div>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            className="form-control w-auto"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Gender&nbsp;</option>
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
          <label>Size</label> <br />
          <label className="form-check-label text-bold" htmlFor="size">
            S
          </label>
          <input
            type="checkbox"
            name="size"
            className="form-check-input ms-1 me-3"
            value={"S"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-check-label text-bold" htmlFor="size">
            M
          </label>
          <input
            type="checkbox"
            name="size"
            className="form-check-input ms-1 me-3 "
            value={"M"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-check-label text-bold" htmlFor="size">
            L
          </label>
          <input
            type="checkbox"
            name="size"
            className="form-check-input ms-1 me-3 "
            value={"L"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-check-label text-bold" htmlFor="size">
            XL
          </label>
          <input
            type="checkbox"
            name="size"
            className="form-check-input ms-1 me-3 "
            value={"XL"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-check-label text-bold" htmlFor="size">
            XXL
          </label>
          <input
            type="checkbox"
            name="size"
            className="form-check-input ms-1 me-3 "
            value={"XXL"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-check-label text-bold" htmlFor="size">
            XXXL
          </label>
          <input
            type="checkbox"
            name="size"
            className="form-check-input ms-1 me-3 "
            value={"XXXL"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="validation-box">
            {errors.size && touched.size ? (
              <p className="form-validation-error">{errors.size}</p>
            ) : null}
          </div>
          <input
            type="text"
            name="price"
            className="form-control w-auto"
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
            className="form-control w-auto"
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
    </>
  );
}

export default AddProduct;
