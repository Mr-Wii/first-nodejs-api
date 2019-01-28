const User = require('./User')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/', (req, res) => {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    (err, user) => {
      if (err) return res.status(500).send('cant add to database D: D: ')
      res.status(200).send(user)
    }
  )
})

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send('404 not found D:')
    res.status(200).send(users)
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send('Problem finding the boi.')
    if (!user) return res.status(404).send('No boi found.')
    res.status(200).send(user)
  })
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err)
      return res.status(500).send('There was a problem deleting the boi.')
    res.status(200).send('Boi ' + user.name + ' was deleted.')
  })
})

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err)
        return res.status(500).send('There was a problem updating the boi.')
      res.status(200).send(user)
    }
  )
})

module.exports = router
