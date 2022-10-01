import { createContext, useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import ProductStore from "../../store/products";
import { observer } from "mobx-react-lite";
import { Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyProductItem from "./myProductItem";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import { useParams } from "react-router-dom";
import UserStore from "../../store/users";
function MyProducts() {
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const editProduct = (id) => {
    store.setActiveProductId(id);
    store.fetchActiveProduct(rootStore.access, id, userId).then(() => {
      if (store.activeProduct) handleEditOpen();
    });
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const StyledFab = styled(Fab)({
    position: "fixed",
    zIndex: 1,
    top: "77%",
    right: 10,
    margin: "0 auto",
  });
  const store = useStore().myProductsStore;
  const rootStore = useStore();
  const { userId } = useParams();

  useEffect(() => store.fetchProducts(rootStore.access, userId), []);
  return (
    <Container>
      <Grid container spacing={2} pt={2}>
        {console.log("store products>>" + store?.products)}
        {store.products?.map((product) => (
          <MyProductItem
            userId={userId}
            key={product.id}
            product={product}
            editProduct={editProduct}
          />
        ))}
      </Grid>
      <StyledFab color="secondary" aria-label="add" onClick={handleAddOpen}>
        <AddIcon />
      </StyledFab>
      {store.activeProduct ? (
        <EditProduct
          open={editOpen}
          handleClose={handleEditClose}
          product={store.activeProduct}
        />
      ) : (
        <></>
      )}

      <AddProduct open={addOpen} handleClose={handleAddClose} />
    </Container>
  );
}

export default observer(MyProducts);
