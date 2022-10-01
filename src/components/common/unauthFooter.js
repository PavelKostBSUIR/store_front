import { ClassNames } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
function UnauthFooter() {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  useEffect(() => {
    setValue("products");
    navigate("/products");
  }, []);
  const handleChange = (e, newValue) => {
    setValue(newValue);
    navigate("/" + newValue);
  };
  return (
    <BottomNavigation
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Products"
        value="products"
        icon={<ShoppingBasketIcon />}
      />
    </BottomNavigation>
  );
}
export default UnauthFooter;
