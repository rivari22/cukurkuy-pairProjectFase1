const router = require('express').Router();
const Controller = require('../controller/customerController.js');


router.get("/service/form", Controller.formServicesHandler);

router.post("/service/form", Controller.postServiceHandler)

router.get("/:id/profile", Controller.showProfile);

router.get("/:id/profile/edit", Controller.renderEditProfile);

router.post("/:id/profile/edit", Controller.editProfile);

router.get("/:id/history/", Controller.renderHistory);

router.get("/:id/feedback/:usid/", Controller.renderAddFeedback);

router.post("/:id/feedback/:usid/", Controller.addFeedback);

router.get("/:id/ongoing/", Controller.renderOngoing);

module.exports = router