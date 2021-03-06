const { Router } = require('express')
const { toJWT } = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt');
const auth = require('./middleware')

const router = new Router()

router.post('/tokens', (req, res, next) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password

    //If there is no email or password entered then send an error message
    if (!email || !password) {
        return res
            .status(400)
            .send({
                message: 'Please supply a valid email and password'
            })
    } else {
        // 1. find user based on email address
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                    res.status(400).send({
                        message: 'User with that email does not exist'
                    })
                }

                // 2. use bcrypt.compareSync to check the password against the stored hash
                if (bcrypt.compareSync(req.body.password, entity.password)) {

                    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
                    res.send({
                        jwt: toJWT({ userId: entity.id })
                    })
                }
                else {
                    res.status(400).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                console.error(err)
                res.status(500).send({
                    message: 'Something went wrong'
                })
            })
    }
})

router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
        message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
})

module.exports = router