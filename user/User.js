const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: '',
  email: '',
  password: '',
})

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
