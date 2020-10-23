const {User, Hairstylist, Service, UserService} = require('../models/index')
const bcrypt = require("bcryptjs")
const intoRupiah = require("../helper/intoRupiahs")
const nodemailer = require("nodemailer")

class Controller {
    // req.session.isLoggedIn = true
    // req.session.username = data.username
    // req.session.IDCustomer = data.id
    static beranda(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        res.render("index", {customerLoggedIn, usernameCustomer, idCustomer  })
    }

    static formRegisterHandler(req, res) {
        let query = null
        if(req.query.msgMiddleware) {
            query = req.query.msgMiddleware
        }
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        let errors = req.query.errors
        if(errors !== undefined) {
            errors = errors.split(',')
        }
        res.render("register", { errors,customerLoggedIn, usernameCustomer, idCustomer, query })
    }

    static postRegisterHandler(req, res){
        let newCustomer = req.body
        let password = req.body.password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        newCustomer.password = hash

        User.create(newCustomer)
        .then(() => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'cukur6kuy@gmail.com',
                    pass: 'cukur123kuy'
                }
            })
    
            let mailOptions = {
                from: 'cukur6kuy@gmail.com',
                to: req.body.email,
                subject: "Registration cukurkuy",
                text: `Hello, ${req.body.name || req.body.username}, you successfully regist on cukurkuy `
            }
            transporter.sendMail(mailOptions)
        })
        .then(() => {
            console.log('email sent')
            res.redirect('/login')
        })
        .catch(err => {
            if(err.name == "SequelizeValidationError") {
                let errors = [];
                err.errors.forEach(element => {
                    errors.push(element.message)
                })
                res.redirect(`/register?errors=${errors}`)
                return
            }
            res.send(err)
        })
    }

    static formLoginHandler(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        res.render("login", {customerLoggedIn, usernameCustomer, idCustomer})
    }

    static loginHandler(req, res) {
        let dataLog = req.body
        User.findOne({
            where: {
                username: dataLog.username
            }
        })
        .then(data => {
            const check = bcrypt.compareSync(dataLog.password, data.password);
            bcrypt.compare(dataLog.password, data.password)
            if(check === true) {
                req.session.isLoggedIn = true
                req.session.username = data.username
                req.session.IDCustomer = data.id
                res.redirect("/services")
            } else{
                res.redirect("/login")
            }
        })
        .catch(err => res.send(err))
    }

    static logoutHandler(req, res) {
        req.session.destroy(err => {
            if(err){
                res.send(err)
            } else {
                res.redirect("/")
            }
        })
    }

    static servicesHandler(req, res) {
        let customerLoggedIn = null
        let usernameCustomer = null
        let idCustomer = null
        if(req.session.isLoggedIn){
            idCustomer = req.session.IDCustomer
            usernameCustomer = req.session.username
            customerLoggedIn = req.session.isLoggedIn
        }
        Service.findAll()
        .then(data => res.render("services", {data, intoRupiah,idCustomer, usernameCustomer, customerLoggedIn}))
        .catch(err => res.send(err))
    }
}

module.exports = Controller