const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 3001
app.listen(port, () => {
  console.log(`GoldenRush running on ${port} `)
})