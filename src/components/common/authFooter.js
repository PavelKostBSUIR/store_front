import { ClassNames } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MessageIcon from "@mui/icons-material/Message";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect, useRef } from "react";
import { Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
function AuthFooter() {
  const store = useStore();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  useEffect(() => {
    setValue("products");
    navigate("/products");
  }, []);
  const handleChange = (e, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "myProducts":
        navigate("/users/" + store.userId + "/products");
        break;
      case "products":
        navigate("/products");
        break;
      default:
        navigate("/products");
        break;
    }
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Products"
          value="products"
          icon={<ShoppingBasketIcon />}
        />
        <BottomNavigationAction
          label="My products"
          value="myProducts"
          icon={<WorkIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
export default observer(AuthFooter);
