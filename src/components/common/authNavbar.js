import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
function AuthNavbar() {
  const navigate = useNavigate();
  const store = useStore();
  const handleLogout = () => {
    store.logout();
    navigate("/products");
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="span"
          color="orange"
          sx={{ flexGrow: 1 }}
        >
          ORANGE
        </Typography>

        <Box mr={3}>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
        <IconButton
          size="large"
          onClick={() => navigate("/users/" + store.userId)}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default AuthNavbar;
