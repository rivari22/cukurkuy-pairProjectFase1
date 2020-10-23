
const router = require('express').Router();
const Controller = require('../controller/controller');
const adminRoutes = require('./admin');
const customerRoutes = require('./customer')

function convertPassword(req, res, next) {
    console.log(req.body, "ini dr middleware")
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.phone_number) {
        res.redirect("/register?msgMiddleware=Tolong isi semua field yang ada")
    } else {
        next()
    }
}

router.get('/', Controller.beranda);

router.use('/admin', adminRoutes);

router.use('/customer', customerRoutes)

router.get('/register', Controller.formRegisterHandler);
router.post('/register', convertPassword, Controller.postRegisterHandler);

router.get("/login", Controller.formLoginHandler)
router.post("/login", Controller.loginHandler)

router.get("/logout", Controller.logoutHandler)

router.get("/services", Controller.servicesHandler)



module.exports = router;