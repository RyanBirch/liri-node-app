require('dotenv').config()
const keys = require('./keys.js')
const fs = require('fs')
const Spotify = require('node-spotify-api')
const axios = require('axios')
const moment = require('moment')

// access keys information
const spotify = new Spotify(keys.spotify)

// grab user input from command line
let command = process.argv[2]
let input = process.argv.slice(3).join(' ')

switch (command) {

    case 'concert-this':
        concertThis()
        break;

    case 'spotify-this-song':


        break;

    case 'movie-this':
        movieThis()
        break;

    case 'do-what-it-says':


        break;

    default:
        console.log('Not a valid command')
}


function concertThis() {
    // get artist from user input and plug it into the bands in town api
    let artist = input
    let concertQuery = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
    axios.get(concertQuery).then( response => {
        // if the artist has upcoming concerts, log them to the console
        if (response.data.length > 0) {
             response.data.forEach( item => {
                 let venue = item.venue.name
                 let location = item.venue.city + ', ' + item.venue.country
                 let date = item.datetime
                 let formattedDate = moment(date).format('L')
                 console.log(`\nVenue: ${venue} \nLocation: ${location} \nDate: ${formattedDate} \n`)
             })
        } else {
            console.log(`\nNo upcoming concerts for ${artist}\n`)
        }
    })
}

function movieThis() {
    let movie = ''
    if (input) movie = input
    else movie = 'Mr. Nobody'
    let movieQuery = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`

    axios.get(movieQuery).then( response => {
        let rd = response.data
        console.log(`\nTitle: ${rd.Title}`)
        console.log(`Year: ${rd.Year}`)
        console.log(`IMDB Rating: ${rd.Ratings[0].Value}`)
        console.log(`Rotten Tomatoes Rating: ${rd.Ratings[1].Value}`)
        console.log(`Production Country: ${rd.Country}`)
        console.log(`Language: ${rd.Language}`)
        console.log(`Plot: ${rd.Plot}`)
        console.log(`Actors: ${rd.Actors} \n`)
    })
}