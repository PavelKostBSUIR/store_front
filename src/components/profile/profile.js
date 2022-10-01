import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import useStore from "../../hooks/useStore";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import UserForm from "./userForm";
import { Contactless } from "@mui/icons-material";
import { Container, Paper, Box } from "@mui/material";
const validationSchema = Yup.object({});

function Profile() {
  const rootStore = useStore();
  const userStore = rootStore.usersStore;
  const user = userStore.user;
  useEffect(() => userStore.fetchUser(rootStore.access, rootStore.userId));
  const submit = (values, { handleReset, setFieldError }) => {
    userStore.putUser(rootStore.access, rootStore.userId, values);
  };
  return user ? (
    <Container sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
      <Paper sx={{ maxWidth: "500px" }}>
        <Formik
          render={(props) => <UserForm {...props} />}
          initialValues={user}
          onSubmit={submit}
          validationSchema={validationSchema}
        />
      </Paper>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}

export default observer(Profile); //check
