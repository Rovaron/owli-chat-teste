const mongoose = require('mongoose')
const router = require('express').Router()
const User = require('../models/User')
var auth = require('./auth')

router.post('', (request, response, next) => {
  if(!request.body.email){
    return response.status(422).send({errors: {email: 'não pode ser vazio'}})
  }

  if(!request.body.password){
    return response.status(422).send({errors: {password: 'não pode ser vazio'}})
  }

  User.findByCredentials(request.body.email, request.body.password)
    .then((user) => {
      const token = auth.signJwt(user)
      response.status(200).send({token})
    })
    .catch((error) => {
      response.status(404).send({message: 'Usuário e ou Senha inválidos.'})
    })

})


module.exports = router