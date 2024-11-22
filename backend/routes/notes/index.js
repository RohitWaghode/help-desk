const notesController = require("../../controllers/notes");
const isAdmin = require("../../middleware");

function notesRoutes(router, API_PREFIX) {
  router.post(API_PREFIX + "/notes/create", notesController.createNotes);

  router.get(API_PREFIX + "/notes/list:ticket_uid", notesController.listNotes);

  router.put(
    API_PREFIX + "/notes/edit/:ticket_id",
    isAdmin,
    notesController.editNotes
  );

  router.delete(
    API_PREFIX + "/notes/delete/:ticket_id",
    isAdmin,
    notesController.deleteNotes
  );

  router.post(
    API_PREFIX + "/notes/reply/:ticket_id",
    notesController.replyNotes
  );
}

module.exports = notesRoutes;
