import { useContext } from "react";
import { ProductStoreContext } from "../components/products/products";

export default function useProductStore() {
  return useContext(ProductStoreContext);
}
