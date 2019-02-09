const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/users', (req, res, next) => {
    if (!req.body.password || !req.body.confirmation || !req.body.email) {
        return res.status(422).send({
            message: 'Email,Password and Confirmation should have a value'
        })
    } else if (req.body.password !== req.body.confirmation) {
        return res.status(422).send({
            message: 'Password confirmation does not match password'
        })
    }

    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        confirmation: bcrypt.hashSync(req.body.confirmation, 10)
    }
    
    User
        .create(user)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User does not exist`
                })
            }
            return res.status(201).send(user)
        })
        .catch(error => next(error))
})

module.exports = router