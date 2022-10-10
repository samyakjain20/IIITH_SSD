const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  roll: {
    type: Number,
    required: true,
    unique: true
  },
  role: {
    type: String,
    // required: false,
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(roll, password, role) {
  console.log("inside: ",roll, password, role)
  // validation
  if (!roll  || !password) {
    throw Error('All fields must be filled')
  }
  // console.log(roll.length);

  // if (roll.length == 10) {
  //   throw Error('Roll no should be exactly 10 digit long')
  // }
  
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough')
  // }

  const exists = await this.findOne({ roll })

  if (exists) {
    throw Error('Roll already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ roll, role, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(roll, password) {

  if (!roll || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ roll })
  if (!user) {
    throw Error('Incorrect Roll')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)