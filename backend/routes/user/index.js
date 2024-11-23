const userControllers = require("../../controllers/user");
const isAdmin = require("../../middleware");

function userRoutes(router, API_PREFIX) {
  router.post(API_PREFIX + "/user/create", userControllers.createUser);

  router.post(API_PREFIX + "/user/login", userControllers.loginUser);

  router.get(
    API_PREFIX + "/users/list",
    //  isAdmin,
    userControllers.listUser
  );

  router.get(API_PREFIX + "/me", userControllers.me);

  router.put(
    API_PREFIX + "/user/edit/:user_uid",
    isAdmin,
    userControllers.editUser
  );

  router.delete(
    API_PREFIX + "/user/delete/:user_uid",
    isAdmin,
    userControllers.deleteUser
  );
}

module.exports = userRoutes;
