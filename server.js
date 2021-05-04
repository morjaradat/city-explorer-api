const express = require('express')
const weather = require('./assets/weather.json')
const cors =require('cors')
// require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3841
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/weather', function (req, res) {
    const arrOfData=weather.data.map(data=>new Weather(data))
    res.send(arrOfData);
  })

class Weather{
    constructor(data){
        this.date=data.valid_date;
        this.description =data.weather.description;
    }
}

app.listen(PORT)