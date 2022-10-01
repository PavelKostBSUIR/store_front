import { createContext, useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import ProductStore from "../../store/products";
import { observer } from "mobx-react-lite";
import { Container, Grid } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ProductItem from "./productItem";
import Filter from "./filter";
function Products() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const StyledFab = styled(Fab)({
    position: "fixed",
    zIndex: 1,
    top: "77%",
    right: 10,
    margin: "0 auto",
  });
  const store = useStore().productStore;
  useEffect(() => store.fetchProducts(), []);
  return (
    <Container>
      <Grid container spacing={2} pt={2}>
        {console.log("store products>>" + store?.products)}
        {store.products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid>
      <StyledFab color="secondary" aria-label="add" onClick={handleOpen}>
        <FilterAltIcon />
      </StyledFab>
      <Filter open={open} handleClose={handleClose} />
    </Container>
  );
}

export default observer(Products);
