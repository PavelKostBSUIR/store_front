import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";

function EditProductForm(props) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    handleBlur,
    // isSubmitting,
    handleReset,
    handleClose,
    open,
  } = props;
  const formikProps = (name, type, initialValue = "") => ({
    name: name,
    value: typeof values[name] !== "undefined" ? values[name] : initialValue,
    onChange: handleChange,
    onBlur: handleBlur,
    label: name,
    type: type,
  });
  return (
    <Dialog
      open={open}
      // keepMounted
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit product</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Edit
        </DialogContentText>
        <TextField {...formikProps("name", "text")} margin="dense" fullWidth />

        <FormControl fullWidth margin="dense">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            {...formikProps("category")}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="car">Car</MenuItem>
            <MenuItem value="house">House</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="demo-simple-select-label-2">City</InputLabel>
          <Select labelId="demo-simple-select-label-2" {...formikProps("city")}>
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="molo">Molodechno</MenuItem>
            <MenuItem value="minsk">Minsk</MenuItem>
          </Select>
        </FormControl>
        <TextField
          {...formikProps("description", "text")}
          margin="dense"
          fullWidth
          multiline
          maxRows={10}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
export default EditProductForm;
