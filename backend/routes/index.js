function getRoutes(router) {
  const API_VERSION = "v1";
  const API_PREFIX = `/help-desk/${API_VERSION}`;

  // ping
  router.get("/ping", async (req, res) => {
    res.send("success...");
  });

  // user
  require("./user")(router, API_PREFIX);

  //ticket
  require("./ticket")(router, API_PREFIX);

  // notes
  require("./notes")(router, API_PREFIX);

  return router;
}

module.exports = getRoutes;
