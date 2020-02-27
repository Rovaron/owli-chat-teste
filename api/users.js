const mongoose = require('mongoose')
const router = require('express').Router()
const User = require('../models/User')
var auth = require('./auth')

router.get('', auth.authenticate, (request, response, next) => {
  response.send('getting all users')
})

router.delete('/:id', auth.authenticate, (request, response, next) => {
  User.findByIdAndDelete(request.user)
    .then(() => {
      response.status(204).send()
    })
})

router.post('', (request, response, next) => {
  const user = new User()
  user.email = request.body.email
  user.nickname = request.body.name
  user.passwordHash = request.body.password
  user.phone = request.body.phone
  user.address = request.body.address

  user.save()
    .then((user) => {
      response.status(201).send({
        _id: user._id,
        name: user.nickname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      })
    })
    .catch((error) => {
      if (error.errors.email.kind === 'unique') {
        response.status(409).send({ message: 'Email já foi cadastrado' })
      } else {
        response.status(500).send({ message: 'Erro ao cadastrar, tente novamente mais tarde'})
      }
    })
})


module.exports = router