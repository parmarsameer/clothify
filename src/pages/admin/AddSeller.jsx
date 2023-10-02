import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

//Yup validation schema

const validationSchema = yup.object({
  ownerName: yup.string().required("Owner name Cannot be empty"),
  brandName: yup.string().required("Brand name cannot be empty"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email address cannot be empty"),
  profilePicture: yup.string().required("Profile link cannot be empty"),
});

function AddSeller() {
  const initialValues = {
    ownerName: "",
    brandName: "",
    email: "",
    profilePicture: "",
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
      registerSeller(values);
      resetForm();
    },
  });

  const registerSeller = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/seller/register",
        values
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      console.log("error while creating seller");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ownerName"
          value={values.ownerName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Owner Name"
        />
        <div className="validation-box">
          {errors.ownerName && touched.ownerName ? (
            <p className="form-validation-error">{errors.ownerName}</p>
          ) : null}
        </div>
        <input
          type="text"
          name="brandName"
          value={values.brandName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Brand Name"
        />
        <div className="validation-box">
          {errors.brandName && touched.brandName ? (
            <p className="form-validation-error">{errors.brandName}</p>
          ) : null}
        </div>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email Address"
        />
        <div className="validation-box">
          {errors.email && touched.email ? (
            <p className="form-validation-error">{errors.email}</p>
          ) : null}
        </div>
        <input
          type="text"
          name="profilePicture"
          value={values.profilePicture}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Profile Link"
        />
        <div className="validation-box">
          {errors.profilePicture && touched.profilePicture ? (
            <p className="form-validation-error">{errors.profilePicture}</p>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSeller;
