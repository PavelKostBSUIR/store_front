import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
import qs from "qs";
//addBearer tokens
//add loading animation while not loaded
const Filter = types.model("Filter", {
  name: types.optional(types.string, ""),
  category: types.optional(types.string, "any"),
  city: types.optional(types.string, "any"),
});
const Product = types.model("Product", {
  id: types.identifierNumber,
  name: types.string,
  category: types.string,
  city: types.string,
  cost: types.number,
  photos: types.array(types.string),
});
const Owner = types.model("Owner", {
  id: types.identifierNumber,
  name: types.string,
  surname: types.string,
  phoneNumber: types.string,
});
const ActiveProduct = types.model("ActiveProduct", {
  name: types.string,
  category: types.string,
  city: types.string,
  cost: types.number,
  description: types.string,
  photos: types.array(types.string),
  owner: Owner,
});
const ProductStore = types
  .model("ProductStore", {
    filter: types.optional(Filter, {}),
    products: types.maybe(types.array(Product)),
    activeProduct: types.maybe(ActiveProduct),
  })
  .actions((self) => {
    return {
      fetchProducts: flow(function* () {
        // self.products = undefined;
        const response = yield apiCall.get("products", self.filter.toJSON());
        self.products =
          response?.status === 200
            ? yield response.json()
            : (console.log("productError>>" + response?.status), undefined);
        console.log(self.products.toJSON().map((product) => product.toJSON()));
      }),
      fetchActiveProduct: flow(function* (id) {
        //  self.activeProduct = undefined;
        const response = yield apiCall.get("products/" + id);
        self.activeProduct =
          response?.status === 200
            ? yield response.json()
            : (console.log("activeProductError>>" + response?.status),
              undefined);
      }),
      setFilter(filter) {
        self.filter = filter;
      },
    };
  });

export default ProductStore;
