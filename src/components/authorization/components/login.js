import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import useStore from "../../../hooks/useStore";
import * as Yup from "yup";
import LoginForm from "../forms/loginForm";
import { observer } from "mobx-react-lite";

const validationSchema = Yup.object({
  login: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
});

function Login(props) {
  const open = props.open;
  const handleClose = props.handleClose;
  const store = useStore();

  const submit = (values, { handleReset, setFieldError }) => {
    store.login(values).then(() => {
      //logging
      if (!store.logged) {
        setFieldError("email", "Email can be used");
        setFieldError("password", "Password can be incorrect");
      } else {
        //alert(JSON.stringify(values, null, 2));
      }
    });
  };

  return (
    <Formik
      render={(props) => (
        <LoginForm {...props} open={open} handleClose={handleClose} />
      )}
      initialValues={{
        login: "pkostukevic@gmail.com",
        password: "11111111",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    />
  );
}

export default observer(Login); //check
