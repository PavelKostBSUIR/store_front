import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
const User = types.model("User", {
  id: types.identifierNumber,
  name: types.string,
  surname: types.string,
  phoneNumber: types.string,
});

const UserStore = types
  .model("UserStore", {
    users: types.maybe(types.array(User)),
  })
  .actions((self) => {
    return {
      registrate: flow(function* (user) {
        const response = yield apiCall.post("users/", user);
        const userId =
          response?.status === 200
            ? yield response.json()
            : (console.log("RegisterUserError>>" + response?.status),
              undefined);
      }),
    };
  });

export default UserStore;
