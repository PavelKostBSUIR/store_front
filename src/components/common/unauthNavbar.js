import { useEffect, useState } from "react";
import Registration from "../authorization/components/registration";
import { AppBar, Button, Typography, Toolbar, Box } from "@mui/material";
import Login from "../authorization/components/login";
function UnauthNavbar() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleRegistrationOpen = () => {
    setOpenRegistration(true);
  };
  const handleRegistrationClose = () => {
    setOpenRegistration(false);
  };

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="span"
          sx={{ flexGrow: 1 }}
          color="orange"
        >
          ORANGE
        </Typography>
        <Box mr={3}>
          <Button color="inherit" onClick={handleLoginOpen}>
            Log In
          </Button>

          <Login open={openLogin} handleClose={handleLoginClose} />
        </Box>
        <Button color="inherit" onClick={handleRegistrationOpen}>
          registration
        </Button>
        <Registration
          open={openRegistration}
          handleClose={handleRegistrationClose}
        />
      </Toolbar>
    </AppBar>
  );
}
export default UnauthNavbar;
