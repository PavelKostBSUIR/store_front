import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
import UsersStore from "./userStore";
import UserStore from "./users";
import ProductStore from "./products";
import MyProductsStore from "./myProducts";
const User = types.model("User", {
  id: types.identifierNumber,
  phoneNumber: types.string,
  name: types.string,
  surname: types.string,
});
const RootStore = types
  .model("RootStore", {
    myProductsStore: types.optional(MyProductsStore, {}),
    productStore: types.optional(ProductStore, {}),
    userStore: types.optional(UserStore, {}),
    usersStore: types.optional(UsersStore, {}),
    logged: types.maybe(types.boolean),
    refresh: types.maybe(types.string),
    access: types.maybe(types.string),
    timerId: types.maybe(types.number),
    user: types.maybe(User),
    userId: types.maybe(types.number),
  })
  .actions((self) => {
    return {
      startRefresh() {
        self.timerId = setInterval(() => self.fetchTokens(), 10000);
      },
      endRefresh() {
        clearInterval(self.timerId);
      },
      fetchTokens: flow(function* () {
        const response =
          self.refresh !== undefined
            ? yield apiCall.post("auth/refresh", {
                refreshToken: self.refresh,
              })
            : (console.log("reere>>" + self.refresh), undefined);
        const tokens =
          response?.status === 200
            ? yield response.json()
            : (console.log("RefreshError>>" + response?.status), undefined);

        if (tokens !== undefined) {
          self.refresh = tokens.refreshToken;
          localStorage.setItem("refresh", tokens.refreshToken);
          self.access = tokens.accessToken;
          self.userId = tokens.userId;
        }
      }),
      fetchLogin: flow(function* (credentials) {
        const response = yield apiCall.post("auth/login", credentials);
        const tokens =
          response?.status === 200
            ? yield response.json()
            : (console.log("LoginError>>" + response?.status), undefined);
        if (tokens !== undefined) {
          self.refresh = tokens.refreshToken;
          localStorage.setItem("refresh", tokens.refreshToken);
          self.access = tokens.accessToken;
          self.userId = tokens.userId;
        }
      }),
      authorize: flow(function* () {
        yield self.fetchTokens();
        self.logged =
          self.refresh !== undefined && self.access !== undefined
            ? true
            : false;

        if (self.logged === true) self.startRefresh();
      }),
      afterCreate() {
        //  localStorage.removeItem("refresh"); //comment
        const refresh = localStorage.getItem("refresh");
        // console.log("storagerefresh>>" + refresh);
        self.refresh = refresh !== null ? refresh : self.refresh;
        self.authorize();
      },
      login: flow(function* (credentials) {
        yield self.fetchLogin(credentials);
        yield self.authorize();
      }),
      logout() {
        self.logged = false;
        self.endRefresh();
        localStorage.removeItem("refresh");
      },
      fetchUser: flow(function* () {
        //  self.activeProduct = undefined;
        const response = yield apiCall.get("me");
        self.user =
          response?.status === 200
            ? yield response.json()
            : (console.log("UserError>>" + response?.status), undefined);
      }),
    };
  });

export default RootStore;
