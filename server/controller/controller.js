let Userdb = require("../model/model")

// Create or save user
exports.create = (req,res) => {
  // Validate request
  if(!req.body) {
    res.status(400).send({message: "Content can't be empty"})
    return
  }

  // Create new instance of user 
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  })

  // Save user
  user
    .save(user)
    .then(data => {
      res.redirect("/add-user")
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while creating a creation operation"
      })
    })
}

// Retrieve all users or a single user
exports.find = (req,res) => {
  if(req.query.id) {
    // Retrieve single user
    const id = req.query.id

    Userdb.findById(id)
      .then(data => {
        if(!data) {
          res.status(404).send({message: `Couldn't find user with id: ${id}`})
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message: "Error occurred while retrieving a user"})
      })
  } else {
    // Retrieve all users
    Userdb.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({message: err.message || "Error occurred while retrieving user information"})
      })
  }
}

// Update user by user id
exports.update = (req,res) => {
  // Validate request
  if(!req.body) {
    return res
      .status(400)
      .send({message: "Data to update can't be empty"})
  }

  const id = req.params.id
  Userdb.findByIdAndUpdate(id, req.body)
    .then(data => {
      if(!data) {
        res.status(400).send({message: `Couldn't update user with id: ${id}`})
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({message: "Error occurred while updating user information"})
    })
}

// Delete user by user id
exports.delete = (req,res) => {
  const id = req.params.id

  Userdb.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({message: `Couldn't delete user with id: ${id}`})
      } else {
        res.send({message: "User successfully deleted"})
      }
    })
    .catch(err => {
      res.status(500).send({message: "Couln't delete user with id: ${id}"})
    })
}