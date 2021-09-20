const mongoose = require("mongoose")

// Define shape of the document
let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: String,
  status: String
})

// Specify document name and shape
const Userdb = mongoose.model("userdb", schema)

module.exports = Userdb