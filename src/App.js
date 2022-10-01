import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useStore from "./hooks/useStore";
import AuthNavbar from "./components/common/authNavbar";
import UnauthNavbar from "./components/common/unauthNavbar";
import Products from "./components/products/products";
import Profile from "./components/profile/profile";
import AuthFooter from "./components/common/authFooter";
import UnauthFooter from "./components/common/unauthFooter";
import { Box } from "@mui/material";
import ActiveProduct from "./components/products/activeProduct";
import MyProducts from "./components/products/myProducts";
function App() {
  const store = useStore();

  return (
    <div>
      {store.logged === undefined ? (
        <div>Loading...</div>
      ) : (
        <div>
          <BrowserRouter>
            {store.logged !== undefined ? (
              store.logged ? (
                <AuthNavbar />
              ) : (
                <UnauthNavbar />
              )
            ) : (
              <div>Loading...</div>
            )}
            <Box sx={{ pb: 8 }}>
              <Routes>
                <Route path="/messages" element={<Profile />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ActiveProduct />} />
                <Route
                  path="/users/:userId/products/:id"
                  element={<ActiveProduct />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users/:userId" element={<Profile />} />
                <Route
                  path="/users/:userId/products"
                  element={<MyProducts />}
                />
              </Routes>
            </Box>
            <footer>
              {store.logged !== undefined ? (
                store.logged ? (
                  <AuthFooter />
                ) : (
                  <UnauthFooter />
                )
              ) : (
                <div>Loading...</div>
              )}
            </footer>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default observer(App);
