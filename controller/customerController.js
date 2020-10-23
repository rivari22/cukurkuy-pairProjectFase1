const {User, Hairstylist, Service, UserService} = require('../models/index')
const intoRupiah = require('../helper/intoRupiahs')
const bcrypt = require("bcryptjs")

class customerController {
    static formServicesHandler(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        if(customerLoggedIn === true){
            let dataService
            Service.findAll()
            .then(data => {
                dataService = data
                return Hairstylist.findAll()
            })
            .then(result => res.render("./customer/servicesForm", { dataService, dataHairstylist: result, intoRupiah,customerLoggedIn, usernameCustomer, idCustomer}))
            .catch(err => {
                res.send(err)
            })
        } else {
            res.redirect("/login")
        }
    }

    static postServiceHandler(req, res) {
        const newService = {
            service_id: +req.body.service_id,
            hairstylist_id: +req.body.hairstylist_id,
            user_id: req.session.IDCustomer,
            feedback: null,
            isDone: false
        }
        UserService.create(newService)
        .then(() => {
            res.redirect(`/customer/${newService.user_id}/ongoing`)
        })
        .catch(err => res.send(err))
    }


    static showProfile(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        User.findOne({where: {id: idCustomer, role: 'customer'}})
            .then(user => {
                res.render('./customer/profile', {user, idCustomer, usernameCustomer, customerLoggedIn})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static renderEditProfile(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        User.findOne({where: {id: idCustomer, role: 'customer'}})
            .then(user => {
                res.render('./customer/editProfile', {user, idCustomer, usernameCustomer, customerLoggedIn})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProfile(req, res) {
        let newProfile = req.body
        let password = req.body.password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        newProfile.password = hash
        User.update(newProfile, {where: {id: req.params.id, role: 'customer'}})
        .then(() => res.redirect(`/customer/${req.params.id}/profile`))
        .catch(err => res.send(err))
    }


    static renderHistory(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        UserService.findAll({include: [User, Hairstylist, Service], where: {isDone: true, user_id: req.params.id}})
            .then(data => {
                res.render('./customer/history', {data, idCustomer, usernameCustomer, customerLoggedIn})
            })
            .catch(err => {
                res.send(err)
            })
    }


    static renderAddFeedback(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        Promise.all([UserService.findByPk(req.params.usid), User.findByPk(req.params.id)])
            .then(data => {
                res.render('./customer/addFeedback', {user: data[1], userService: data[0],  idCustomer, usernameCustomer, customerLoggedIn})
            })
    }

    static addFeedback(req, res) {
        UserService.findByPk(req.params.usid)
            .then(result => {
                const newData = {
                    user_id: result.user_id,
                    hairstylist_id: result.hairstylist_id,
                    service_id: result.service_id,
                    feedback: req.body.feedback,
                    isDone: result.isDone
                }
                return UserService.update(newData, {where: {id: req.params.usid}})
            })
            .then(() => {
                res.redirect(`/customer/${req.params.id}/history`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static renderOngoing(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        UserService.findAll({include: [User, Hairstylist, Service], where: {isDone: false, user_id: req.params.id}})
            .then(data => {
                data = data.map((e, i) => {
                    e.UserServiceId = i
                    return e
                })
                console.log(data.UserServiceId)
                res.render('./customer/ongoing', {data, idCustomer, usernameCustomer, customerLoggedIn})
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = customerController