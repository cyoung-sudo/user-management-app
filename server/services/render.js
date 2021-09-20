const axios = require("axios") // Allows network requests

// Dynamic base-url for production
const url = (process.env.NODE_ENV ? process.env.PRODUCTION_BASEURL : process.env.DEVELOPMENT_BASEURL);

// Functions for router.js
exports.homeRoute = (req,res) => {
  // Make GET request to /api/users
  axios.get(`${url}api/users`)
    .then(function(response) {
      res.render("index", {users: response.data})
    })
    .catch(err => {
      res.send(err)
    })
}

exports.add_user = (req,res) => {
  res.render("add_user");
}

exports.update_user = (req,res) => {
  // Make GET request to /api/users
  axios.get(`${url}api/users`, {params: {id: req.query.id}})
    .then(function(userdata) {
      res.render("update_user", {user: userdata.data})
    })
    .catch(err => {
      res.send(err)
    })
}