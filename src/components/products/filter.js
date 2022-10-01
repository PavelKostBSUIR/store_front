import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import useStore from "../../hooks/useStore";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import FilterForm from "./forms/filterForm";
function Filter(props) {
  const open = props.open;
  const handleClose = props.handleClose;
  const store = useStore().productStore;

  const submit = (values, { handleReset, setFieldError }) => {
    store.setFilter(values);
    store.fetchProducts();
    handleClose();
  };
  return (
    <Formik
      render={(props) => (
        <FilterForm {...props} open={open} handleClose={handleClose} />
      )}
      initialValues={store.filter}
      onSubmit={submit}
    />
  );
}

export default Filter; //check
