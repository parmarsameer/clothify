import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

// Yup validation schema
const validationSchema = yup.object({
  firstName: yup.string().required("Please enter First Name"),
  lastName: yup.string().required("Please enter Last Name"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Please enter Email"),
  phone: yup
    .string()
    .min(10, "Must be valid phone number")
    .max(10, "Must be valid phone number")
    .required("Please enter phone number"),
  password: yup
    .string()
    .min(4, "Password must be atlest 4 characters long")
    .max(25, "Password must be max 25 characters long")
    .required("Please enter a password"),
});

function UserRegistration() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };

  // Formik
  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      registerUser(values);
      resetForm();
    },
  });

  const registerUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        user
      );
      const { success } = response.data;
      if (success) {
        setAlert(true);
        setTimeout(() => {
          navigate("/user-login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
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
          <div>Registration successfull!</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            onClick={() => setAlert(false)}
          ></button>
        </div>
      )}
      <div className="user-registration-form d-flex justify-content-center align-items-center vh-100">
        <div className="p-5 text-center " style={{ width: "40%" }}>
          <h1 className="mb-5">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="d-flex gap-2">
              <div className="form-floating  text-end" style={{ width: "50%" }}>
                <input
                  type="text"
                  className="form-control input"
                  id="floatingInput"
                  name="firstName"
                  value={values.firstName}
                  placeholder="First name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">First name</label>
                <div className="validation-box">
                  {errors.firstName && touched.firstName ? (
                    <p className="form-validation-error">{errors.firstName}</p>
                  ) : null}
                </div>
              </div>

              <div
                className="form-floating text-start"
                style={{ width: "50%" }}
              >
                <input
                  type="text"
                  className=" form-control input"
                  name="lastName"
                  id="floatingInput"
                  value={values.lastName}
                  placeholder="Last name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Last name</label>
                <div className="validation-box">
                  {errors.lastName && touched.lastName ? (
                    <p className="form-validation-error">{errors.lastName}</p>
                  ) : null}
                </div>
              </div>
            </div>{" "}
            <div className="form-floating">
              <input
                type="text"
                className="form-control input"
                id="floatingInput"
                name="email"
                value={values.email}
                placeholder="Email address"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Email address</label>
              <div className="validation-box">
                {errors.email && touched.email ? (
                  <p className="form-validation-error">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control input"
                id="floatingInput"
                name="phone"
                value={values.phone}
                placeholder="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Phone</label>
              <div className="validation-box">
                {errors.phone && touched.phone ? (
                  <p className="form-validation-error">{errors.phone}</p>
                ) : null}
              </div>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control input"
                id="floatingInput"
                name="password"
                value={values.password}
                placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Password</label>
              <div className="validation-box">
                {errors.password && touched.password ? (
                  <p className="form-validation-error">{errors.password}</p>
                ) : null}
              </div>
            </div>
            <button className="btn btn-primary my-4" type="submit">
              Sign Up
            </button>
          </form>
          <Link to={"/user-login"} className="color-primary">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;
