const {User, Hairstylist, Service, UserService} = require('../models/index')
const intoRupiah = require('../helper/intoRupiahs')
const bcrypt = require("bcryptjs")

class AdminController {
    static getAllUserHandler(req, res) {  
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        let dataUserNService
        User.findAll({
            include: Service,
            order: [["id", "ASC"]]
        })
        .then(data => {
            dataUserNService = data
            return Hairstylist.findAll()
        })
        .then(dataHairstylist => {
            if(isLogin === true) {
                res.render("./admin/admin", { dataUserNService, dataHairstylist, isLogin})
            } else {
                res.redirect("/admin/login")
            }
        })
        .catch(err => res.send(err))
    }

    static formAddAdminHandler(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        if(isLogin == true) {
            res.render("./admin/addAdmin", {isLogin})
        } else {
            res.redirect("/admin/login")
        }
    }

    static postAddAdminHandler(req, res) {
        let newAdmin = req.body
        let password = req.body.password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        newAdmin.password = hash
        User.create(newAdmin)
        .then(() => res.redirect("/admin"))
        .catch(err => res.send(err))
    }

    static formLoginAdminHandler(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        if(isLogin == true) {
            res.render("./admin/login", {isLogin})
        } else {
            res.render("./admin/login", {isLogin})
        }
    }

    static loginAdminHandler(req, res) {
        let dataLog = req.body

        User.findOne({
            where: {
                username: dataLog.username
            }
        })
        .then(data => {
            const check = bcrypt.compareSync(dataLog.password, data.password);
            bcrypt.compare(dataLog.password, data.password)
            if(check === true && data.role === "admin") {
                req.session.isLoggedInAdmin = true
                req.session.usernameAdmin = data.username
                req.session.idAdmin = data.id
                res.redirect("/admin")
            } else{
                res.redirect("/admin/login")
            }
        })
        .catch(err => res.send(err))
    }

    static logoutAdminHandler(req, res) {
        req.session.destroy(err => {
            if(err){
                res.send(err)
            } else {
                res.redirect("/")
            }
        })
    }

    static formAddHairstylistHandler(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        if(isLogin == true) {
            res.render("./admin/addHairstylist", {isLogin})
        } else {
            res.redirect("/admin/login")
        }
    }

    static postAddHairstylistHandler(req, res) {
        const newHairstylist = req.body
        Hairstylist.create(newHairstylist)
        .then(() => res.redirect("/admin"))
        .catch(err => res.send(err))
    }

    static renderEditAdmin(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        User.findOne({where: {id: req.params.id, role: "admin"}})
            .then(admin => {
                if(isLogin == true) {
                    res.render('./admin/editAdmin', {admin, isLogin})
                } else {
                    res.redirect("/admin/login")
                }
            })
            .catch(err => res.send(err))
    }

    static editAdmin(req, res) {
        const admin = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
            phone_number: req.body.phone_number,
            role: "admin"
        }
        User.update(admin, {where: {id: req.params.id}})
            .then(() => {
                res.redirect('/admin');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static renderEditHairstylist(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        Hairstylist.findByPk(req.params.id)
            .then(hairstylist => {
                if(isLogin == true) {
                    res.render('./admin/editHairstylist', {hairstylist, isLogin})
                } else {
                    res.redirect("/admin/login")
                }
            })
            .catch(err => res.send(err))
    }

    static editHairstylist(req, res) {
        const hairstylist = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
            phone_number: req.body.phone_number
        }
        Hairstylist.update(hairstylist, {where: {id: req.params.id}})
            .then(() => {
                res.redirect('/admin');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static deleteAdmin(req, res) {
        User.destroy({where: {id: req.params.id}})
            .then(() => {
                res.redirect('/admin')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static deleteHairstylist(req, res) {
        Hairstylist.destroy({where: {id: req.params.id}})
            .then(() => {
                res.redirect('/admin')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static showServices(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        Service.findAll({order: [['id', 'ASC']]})
            .then(services => {
                if(isLogin == true) {
                    res.render('./admin/services', {content: services, converter: intoRupiah, isLogin})
                } else {
                    res.redirect("/admin/login")
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static renderAddService(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        if(isLogin == true) {
            res.render('./admin/addService', {isLogin})   
        } else {
            res.redirect("/admin/login")
        }
    }

    static addService(req, res) {
        const newService = {
            name: req.body.name,
            price: req.body.price,
            duration: req.body.duration
        }
        Service.create(newService)
            .then(service => {
                res.redirect('/admin/services');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static renderEditService(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        Service.findByPk(req.params.id)
            .then(service => {
                if(isLogin == true) {
                    res.render('./admin/editService', {service, isLogin})
                } else {
                    res.redirect("/admin/login")
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editService(req, res) {
        const service = {
            name: req.body.name,
            price: req.body.price,
            duration: req.body.duration
        }
        Service.update(service, {where: {id: req.params.id}})
            .then(() => {
                res.redirect('/admin/services');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static deleteService(req, res) {
        Service.destroy({where: {id: req.params.id}})
            .then(() => {
                res.redirect('/admin/services')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static logoutAdminHandler(req, res) {
        req.session.destroy(err => {
            if(err){
                res.send(err)
            } else {
                res.redirect("/admin/login")
            }
        })
    }

    static renderSendGmail(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        if(isLogin == true) {
            res.render('./admin/mail', {isLogin})
        } else {
            res.redirect("/admin/login")
        }
    }

    static sendGmail(req, res) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cukur6kuy@gmail.com',
                pass: 'cukur123kuy'
            }
        })

        let mailOptions = {
            from: 'cukur6kuy@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        }

        transporter.sendMail(mailOptions)
            .then(() => {
                console.log('email sent')
                res.redirect('/admin')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static showServicesPerCustomer(req, res) {
        let isLogin = null
        if(req.session.isLoggedInAdmin) {
            isLogin = req.session.isLoggedInAdmin
        }
        UserService.findAll({include: [User, Hairstylist, Service], where: {user_id: req.params.id}})
            .then(data => {
                if(isLogin == true) {
                    res.render('./admin/servicesPerCust', {data, isLogin})   
                } else {
                    res.redirect("/admin/login")
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static doneService(req, res) {
        UserService.findByPk(req.params.usid)
            .then(data => {
                const newData = {
                    user_id: data.user_id,
                    hairstylist_id: data.hairstylist_id,
                    service_id: data.service_id,
                    feedback: data.feedback,
                    isDone: true
                }
                return UserService.update(newData, {where: {id: req.params.usid}})
            })
            .then(() => {
                res.redirect(`/admin/services/${req.params.id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = AdminController