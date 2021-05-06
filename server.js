const express = require('express')
// const weather = require('./assets/weather.json')
const superagent = require('superagent');
const cors = require('cors')
const weatherApi =require('./component/weatherApi')
const movieApi = require('./component/movieApi')


require('dotenv').config()

const PORT = process.env.PORT || 3841

const app = express()

app.use(cors())
// console.log(PORT);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/weather', weatherApi)

app.get('/movie', movieApi)



app.listen(PORT)