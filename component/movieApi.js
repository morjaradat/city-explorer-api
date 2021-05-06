const superagent = require('superagent');
require('dotenv').config()

const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const MOVIE_API_URL = process.env.MOVIE_API_URL
const cache ={};
const movieApi = (req, res) => {
    if (cache[req.query.query] !== undefined) {
        console.log('from IF ');
        res.send(cache[req.query.query]);
    } else {
        console.log('ELSE ');
        try {
            const movieUrl = `${MOVIE_API_URL}?api_key=${MOVIE_API_KEY}&language=en-US&include_adult=false&query=${req.query.query}`
            superagent.get(movieUrl).then(movieData => {
                // console.log(movieData.body.results)
                const arrOfData = movieData.body.results.map(mdata => new Movie(mdata))
                // console.log(arrOfData)
                cache[req.query.query] =arrOfData ;
                res.send(arrOfData);
            })
        } catch (error) {
            // console.log('erorr')
            res.send(error);
        }
    }

}

class Movie {
    constructor(data) {
        this.title = data.original_title
        this.description = data.overview
        this.imgUrl = data.poster_path
        this.releaseDate = data.release_date

    }
}
module.exports = movieApi;


