require('dotenv').config()
const keys = require('./keys.js')
const fs = require('fs')
const Spotify = require('node-spotify-api')
const axios = require('axios')

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
            console.log('venue name: ' + response.data[0].venue.name)
            console.log('venue location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country)
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