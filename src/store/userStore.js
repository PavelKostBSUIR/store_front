import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";

const User = types.model("User", {
  name: types.string,
  surname: types.string,
  phoneNumber: types.string,
});

const UsersStore = types
  .model("UserStore", {
    user: types.maybe(User),
  })
  .actions((self) => {
    return {
      fetchUser: flow(function* (access, userId) {
        //  self.activeProduct = undefined;
        const response = yield apiCall.get(
          "users/" + userId,
          undefined,
          access
        );
        self.user =
          response?.status === 200
            ? yield response.json()
            : (console.log("userError>>" + response?.status), undefined);
      }),
      putUser: flow(function* (access, userId, user) {
        yield apiCall.put("users/" + userId, user, access);
      }),
    };
  });
export default UsersStore;
