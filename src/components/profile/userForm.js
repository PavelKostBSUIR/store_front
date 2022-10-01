import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Paper, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
export const UserForm = (props) => {
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
    <Box m={5} >
      <TextField {...formikProps("name", "text")} margin="dense" fullWidth />
      <TextField {...formikProps("surname", "text")} margin="dense" fullWidth />
      <TextField
        {...formikProps("phoneNumber", "text")}
        margin="dense"
        fullWidth
      />
      <Box>
        <Button color="primary" disabled={!isValid} onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
export default observer(UserForm);
