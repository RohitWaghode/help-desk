const ticketControllers = require("../../controllers/ticket");
const isAdmin = require("../../middleware/index");

function ticketRoutes(router, API_PREFIX) {
  router.post(
    API_PREFIX + "/ticket/create/:user_uid",
    ticketControllers.createTicket
  );
  router.get(API_PREFIX + "/ticket/list", ticketControllers.listTicket);

  router.put(API_PREFIX + "/ticket/edit", ticketControllers.editTicket);

  router.delete(
    API_PREFIX + "/ticket/delete/:ticket_id",
    isAdmin,
    ticketControllers.deleteTicket
  );

  router.get(
    API_PREFIX + "/ticket/get-file/:filename",
    ticketControllers.getFile
  );
}

module.exports = ticketRoutes;
