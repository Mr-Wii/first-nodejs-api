const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../user/User')
const config = require('../config')
const VerifyToken = require('./VerifyToken')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    (err, user) => {
      if (err) return res.status(500).send('F user registration')
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // rip in 24 hours
      })
      res.status(200).send({ auth: true, token })
    }
  )
})

router.get('/me', (req, res) => {
  const token = req.headers['x-access-token']
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: 'BOI aint provided no tokken' })

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'f Tokken' })

    User.findById(
      decoded.id,
      { password: 0 }, // projection
      (err, user) => {
        if (err) return res.status(500).send('Problem finding the boi.')
        if (!user) return res.status(404).send('No boi found.')
        res.status(200).send(user)
      }
    )
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('server error D:')
    if (!user) return res.status(404).send('no boi found.')
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null })
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    })
    res.status(200).send({ auth: true, token })
  })
})

router.get('/me', VerifyToken, (req, res, next) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the boi.')
    if (!user) return res.status(404).send('No boi found.')
    res.status(200).send(user)
  })
})

router.get('/logout', (req, res) => {
  res.status(200).send({
    auth: false,
    token: null,
  })
})

module.exports = router
