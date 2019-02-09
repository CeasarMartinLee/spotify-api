const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt');

const router = new Router()

router.get('/users', (req, res, next) => {
    User
        .findAll()
        .then(user => res.send({ user }))
        .catch(error => next(error))
})

router.get('/users/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: `User does not exist`
          })
        }
        return res.send(user)
      })
      .catch(error => next(error))
})

router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
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