import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import useStore from "../../hooks/useStore";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import AddProductForm from "./forms/addProductForm";
import { ENDPOINT } from "../../api";
function AddProduct(props) {
  const open = props.open;
  const handleClose = props.handleClose;
  const store = useStore().myProductsStore;
  const rootStore = useStore();
  const [photos, setPhotos] = useState([]);
  useEffect(() => console.log("photos>>" + JSON.stringify(photos)), [photos]);
  const handleChangePhotos = (photos) => setPhotos(photos);
  const submit = (values, { handleReset, setFieldError }) => {
    values.photos = photos.map((photo) => uuidv4() + photo.path);

    store.addProduct(rootStore.access, rootStore.userId, values, photos);
    handleClose();
  };
  return (
    <Formik
      render={(props) => (
        <AddProductForm
          {...props}
          handleChangePhotos={handleChangePhotos}
          open={open}
          handleClose={handleClose}
        />
      )}
      initialValues={{
        category: "any",
        city: "any",
      }}
      onSubmit={submit}
    />
  );
}

export default observer(AddProduct); //check
