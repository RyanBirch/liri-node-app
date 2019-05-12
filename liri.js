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

        break;

    case 'spotify-this-song':


        break;

    case 'movie-this':


        break;

    case 'do-what-it-says':


        break;

    default:
        console.log('Not a valid command')
}