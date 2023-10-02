import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const { values, resetForm, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      logInUser(values);
      resetForm();
    },
  });

  const logInUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        user,
        { withCredentials: true }
      );
      if (response.data.success) {
        setAlert(true);
        setTimeout(() => {
          navigate("/");
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
          <div>Login successfull!</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            onClick={() => setAlert(false)}
          ></button>
        </div>
      )}
      <div className="user-registration-form d-flex justify-content-center align-items-center vh-100">
        <div className="p-5 text-center " style={{ width: "40%" }}>
          <h1 className="mb-5">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="email"
                className="form-control"
                id="floatingInput"
                value={values.email}
                placeholder="Emial"
                required
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                name="password"
                className="form-control"
                value={values.password}
                placeholder="Password"
                required
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Password</label>
            </div>
            <button type="submit" className="btn btn-primary py-1 px-3 my-4">
              Log In
            </button>
          </form>
          <Link to={"/"} className="text-secondary">
            Forgot password?
          </Link>{" "}
          <br />
          &nbsp;
          <Link to={"/user-registration"} className="color-primary">
            Don't have an account? Sign up
          </Link>{" "}
          <br />
        </div>
      </div>
    </>
  );
}

export default UserLogin;
