import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
import qs from "qs";
import { values } from "mobx";
//addBearer tokens
//add loading animation while not loaded
function filterNonNull(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([k, v]) => v !== null && v !== "" && v !== undefined
    )
  );
}
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
const MyProductsStore = types
  .model("ProductStore", {
    activeProductId: types.maybe(types.number),
    products: types.maybe(types.array(Product)),
    activeProduct: types.maybe(ActiveProduct),
  })
  .actions((self) => {
    return {
      setActiveProductId(id) {
        self.activeProductId = id;
      },
      fetchProducts: flow(function* (access, userId) {
        // self.products = undefined;
        const response = yield apiCall.get(
          "users/" + userId + "/products",
          undefined,
          access
        );
        self.products =
          response?.status === 200
            ? yield response.json()
            : (console.log("myproductsError>>" + response?.status), undefined);
        console.log(self.products.toJSON().map((product) => product.toJSON()));
      }),
      fetchActiveProduct: flow(function* (access, id, userId) {
        //  self.activeProduct = undefined;
        const response = yield apiCall.get(
          "users/" + userId + "/products/" + id,
          undefined,
          access
        );
        self.activeProduct =
          response?.status === 200
            ? yield response.json()
            : (console.log("activeProductError>>" + response?.status),
              undefined);
      }),
      setFilter(filter) {
        self.filter = filter;
      },
      putProduct: flow(function* (access, id, userId, product) {
        console.log("i like to edit>>>" + JSON.stringify(product));
        yield apiCall.put(
          "users/" + userId + "/products/" + id,
          product,
          access
        );
        yield self.fetchProducts(access, userId);
      }),
      addProduct: flow(function* (access, userId, product, photos) {
        const response = yield apiCall.post(
          "users/" + userId + "/products",
          product,
          access
        );
        //errors can occur
        const productId =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("addProductError>>" + response?.status), undefined);
        console.log("saved product id>>>" + productId);
        const productsName = [...product.photos];
        if (productId !== undefined) {
          product.photos = product.photos.map(
            (photo) =>
              apiCall.domain +
              "res/users/" +
              userId +
              "/products/" +
              productId +
              "/photos/" +
              photo
          );
          yield self.putProduct(access, productId, userId, product);
          const formData = new FormData();
          let i = 0;
          photos.forEach((photo) => {
            formData.append("files", photo, productsName[i]);
            i++;
          });
          yield fetch(
            apiCall.domain +
              "users/" +
              userId +
              "/products/" +
              productId +
              "/photos",
            {
              headers: { Authorization: "Bearer " + access },
              method: "POST",
              body: formData,
            }
          );
        }
        yield self.fetchProducts(access, userId);
      }),
    };
  });

export default MyProductsStore;
