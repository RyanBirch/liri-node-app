require('dotenv').config()
const keys = require('./keys.js')
const fs = require('fs')

// access keys information
const spotify = new Spotify(keys.spotify)