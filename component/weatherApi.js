const weather = require('../assets/weather.json')
const superagent = require('superagent');
require('dotenv').config()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL=process.env.WEATHER_API_URL

const weatherApi = (req, res)=> {
  try {
    const weatherBitUrl = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`

    superagent.get(weatherBitUrl).then(weatherBitData => {
      // console.log(weatherBitData.body.data)
      const arrOfData = weatherBitData.body.data.map(data => new Weather(data))
      res.send(arrOfData);
    })
  } catch (error) {
    // console.log('erorr')
    const arrOfData = weather.data.map(data => new Weather(data))
    res.send(arrOfData);
  }

}

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = weatherApi;