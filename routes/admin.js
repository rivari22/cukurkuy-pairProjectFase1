const router = require('express').Router();
const Controller = require('../controller/adminController');

router.get('/', Controller.getAllUserHandler);

router.get('/add/admin', Controller.formAddAdminHandler);

router.post('/add/admin', Controller.postAddAdminHandler);

router.get("/login", Controller.formLoginAdminHandler);

router.post("/login", Controller.loginAdminHandler);

router.get('/logout', Controller.logoutAdminHandler);

router.get('/add/hairstylist', Controller.formAddHairstylistHandler);

router.post('/add/hairstylist', Controller.postAddHairstylistHandler);

router.get('/edit/:id/admin', Controller.renderEditAdmin);

router.post('/edit/:id/admin', Controller.editAdmin);

router.get('/edit/:id/hairstylist', Controller.renderEditHairstylist);

router.post('/edit/:id/hairstylist', Controller.editHairstylist);

router.get('/delete/:id/admin', Controller.deleteAdmin);

router.get('/delete/:id/hairstylist', Controller.deleteHairstylist);

router.get('/services', Controller.showServices);

router.get('/services/add', Controller.renderAddService);

router.post('/services/add', Controller.addService);

router.get('/services/delete/:id', Controller.deleteService);

router.get('/services/edit/:id', Controller.renderEditService);

router.post('/services/edit/:id', Controller.editService);

// router.get("/logout/admin", Controller.logoutAdminHandler)
router.get('/services/:id', Controller.showServicesPerCustomer);

router.get('/services/:id/done/:usid', Controller.doneService)

router.get('/send', Controller.renderSendGmail);

router.post('/send', Controller.sendGmail);




module.exports = router;