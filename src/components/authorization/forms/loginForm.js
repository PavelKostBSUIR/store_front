import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
export const LoginForm = (props) => {
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
  //console.table(props);
  useEffect(() => {
    if (open) handleReset();
  }, [open]);

  const formikProps = (name, type, initialValue = "") => ({
    name: name,
    value: typeof values[name] !== "undefined" ? values[name] : initialValue,
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && Boolean(errors[name]),
    helperText: touched[name] ? errors[name] : "",
    label: name,
    type: type,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Registrate</DialogTitle>
      <DialogContent>
        <DialogContentText>Login!!!</DialogContentText>
        <TextField
          {...formikProps("login", "email")}
          margin="dense"
          fullWidth
        />
        <TextField
          {...formikProps("password", "password")}
          margin="dense"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!isValid} onClick={handleSubmit}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LoginForm;
