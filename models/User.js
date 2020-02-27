const mongoose =  require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const { SECRET, SALT_ROUNDS } = require('../config')
const messageSchema = require('./Message')

const userSchema =  new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [ /\S+@\S+\.\S+/, 'Email inválido' ],
    index: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    cep: { 
      type: String, 
      required: true
    },
    street: {
      type: String,
      required: true
    },
    neighborhood: {
      type: String,
      required:  true
    },
    complement: {
      type: String
    },
    number: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'Brasil'
    }
  },
  messages: [messageSchema],
  role: {
    type: String,
    default: 'USER'
  }
})

userSchema.pre('save', function(next){
  if (!this.isModified('passwordHash')) return next()
  bcrypt.hash(this.passwordHash, SALT_ROUNDS)
    .then((hash) => {
      this.passwordHash = hash
      next()
    })
    .catch((error) => {
      next(error)
    })
})

userSchema.statics.findByCredentials = async (userEmail, userPassword) => {
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new Error({ message: 'Email não cadastrado'})
  }

  const passwordMatches = await bcrypt.compare(userPassword, user.passwordHash)
  if (!passwordMatches) {
    throw new Error({ message: 'Senha não confere'})
  }

  return user
}

userSchema.methods.pushMessage = function (from, to, message) {
  this.messages.push({from, to, message})
  return this.save()
}

const User = mongoose.model('User', userSchema)

userSchema.plugin(uniqueValidator, {message: 'Já foi cadastrado.'})

module.exports = User