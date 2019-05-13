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

// we will search different apis based on command given by the user
switch (command) {

    case 'concert-this':
        concertThis()
        break;

    case 'spotify-this-song':
        spotifyThisSong()
        break;

    case 'movie-this':
        movieThis()
        break;

    case 'do-what-it-says':
        doWhatItSays()
        break;

    default:
        console.log('Not a valid command')
}


// search bands in town api for artist requested by the user
function concertThis() {
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


// search omdb api for movie requested by the user
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


// search spotify api for song requested by the user
function spotifyThisSong() {
    let song = ''
    if (input) song = input
    else song = 'The Sign'

    spotify.search({
        type: 'track', 
        query: song, 
        limit: 20
    }, (err, data) => {
        if (err) return console.log(err)

        if (song === 'The Sign') {
            data.tracks.items.forEach( elem => {

                // if no song is provided, the search will default to 'The Sign' by Ace of Base
                if (elem.album.artists[0].name === 'Ace of Base' && elem.name === 'The Sign') {
                    console.log(`\nArtist: ${elem.album.artists[0].name}`)
                    console.log(`Song: ${elem.name}`)
                    console.log(`Album: ${elem.album.name}`)
                    console.log(`Preview Link: ${elem.external_urls.spotify} \n`)
                }
            })
        } else {
            // if a song is provided, search for that song
            console.log(`\nArtist: ${data.tracks.items[0].album.artists[0].name}`)
            console.log(`Song: ${data.tracks.items[0].name}`)
            console.log(`Album: ${data.tracks.items[0].album.name}`)
            console.log(`Preview Link: ${data.tracks.items[0].external_urls.spotify} \n`)
        }
    })
}


// read random.txt file and execute command inside
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', (err, data) => {

        if (err) return console.log(err)

        let dataArr = data.split(',')
        command = dataArr[0]
        input = dataArr[1]
        // remove quotes from around input
        if (input) input = input.substr(1, input.length - 2)

        if (command === 'concert-this') concertThis()
        else if (command === 'spotify-this-song') spotifyThisSong()
        else if (command === 'movie-this') movieThis()
        else console.log('\nNot a valid command \n')
    })
}