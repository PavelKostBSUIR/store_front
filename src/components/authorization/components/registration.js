import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import RegistrationForm from "../forms/registrationForm";
import useStore from "../../../hooks/useStore";
const validationSchema = Yup.object({
  login: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

function Registration(props) {
  const store = useStore().userStore;
  const open = props.open;
  const handleClose = props.handleClose;
  const submit = (values, { handleReset, setFieldError }) => {
    store.registrate(values);
    handleClose();
    /*if (values.email === "abc@abc.com") {
      setFieldError("email", "Email is already used");
      //  setSubmitting(false);
    } else {
      alert(JSON.stringify(values, null, 2));
    
    //  handleReset();
    }*/
  };

  return (
    <Formik
      render={(props) => (
        <RegistrationForm {...props} open={open} handleClose={handleClose} />
      )}
      initialValues={{
        login: "pkostukevic@gmail.com",
        password: "11111111",
        confirmPassword: "11111111",
        name: "pavel",
        surname: "kostukeviich",
        phoneNumber: "+375295739029",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    />
  );
}

export default Registration;
