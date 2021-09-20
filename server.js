const express = require("express")
const dotenv = require("dotenv") // Loads env vars from .env file into process.env
const morgan = require("morgan")
const bodyparser = require("body-parser")
const path = require("path")

const connectDB = require("./server/database/connection")

const app = express()

// Define path of .env file
dotenv.config({path:"config.env"})

// Defined port value in config.env
const PORT = process.env.PORT||8080

// Logs requests to the console
app.use(morgan("tiny"))

// MogoDB connection
connectDB()

// Parses encoded data subitted using HTTP POST
app.use(bodyparser.urlencoded({extended: true}))

// Set view engine
app.set("view engine", "ejs")

// Reference "css/style.css" instead of "../assets/css/style.css"
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))

// Load routers
app.use("/", require("./server/routes/router"))

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})