import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import useStore from "../../hooks/useStore";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import EditProductForm from "./forms/editProductForm";
function EditProduct(props) {
  const product = props.product;
  const open = props.open;
  const handleClose = props.handleClose;
  const store = useStore().myProductsStore;
  const rootStore = useStore();
  const submit = (values, { handleReset, setFieldError }) => {
    console.log("product>>" + JSON.stringify(product));
    store.putProduct(
      rootStore.access,
      store.activeProductId,
      rootStore.userId,
      values
    );
    /*[
      ...product,
      values,
    ]);*/

    handleClose();
  };
  return (
    <Formik
      render={(props) => (
        <EditProductForm {...props} open={open} handleClose={handleClose} />
      )}
      initialValues={product}
      onSubmit={submit}
    />
  );
}

export default observer(EditProduct); //check
