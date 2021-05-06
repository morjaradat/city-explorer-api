const weather = require('../assets/weather.json')
const superagent = require('superagent');
require('dotenv').config()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL=process.env.WEATHER_API_URL

const cache  ={};

const weatherApi = (req, res)=> {
  // const lat = req.query.lat
  // const lon = req.query.lon
  if (cache[(req.query.lat,req.query.lon)] !== undefined) {
    // console.log(`this is stucture  ${cache[(req.query.lat,req.query.lon)]}`);
    // console.log(`this is cache ${cache}`);
    // console.log('from IF ');
    res.send(cache[(req.query.lat,req.query.lon)])

  } else {
    console.log('ELSE ');
    try {
      const weatherBitUrl = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`
  
      superagent.get(weatherBitUrl).then(weatherBitData => {
        // console.log(weatherBitData.body.data)
        const arrOfData = weatherBitData.body.data.map(data => new Weather(data))
        cache[(req.query.lat,req.query.lon)] = arrOfData;
        res.send(arrOfData);
      })
    } catch (error) {
      // console.log('erorr')
      const arrOfData = weather.data.map(data => new Weather(data))
      res.send(arrOfData);
    }
  }
  

}

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = weatherApi;