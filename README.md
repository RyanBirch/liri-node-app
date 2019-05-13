# liri-node-app

## Overview
This is a command line node.js app where the user can request data from different apis. You can request concert data from the bands in town api, movie data from the omdb api, or music data from the spotify node api. Commands can be taken in either directly through the command line, or through a text file.

## To request concert data: 
> node liri.js concert-this [name of artist]

### Example:  
<img src="images/concert-this.png" width="1000"><br>
<br><br>


## To request movie data: 
> node liri.js movie-this [name of movie]

### Example: 
<img src="images/movie-this.png" width="1000"><br>   

### If no movie is specified, it will default to 'Mr. Nobody'
<img src="images/movie-this, no movie given.png" width="1000"><br>
<br><br>


## To request song data: 
> node liri.js spotify-this-song [name of song]

### Example: 
<img src="images/spotify-this-song.png" width="1000"><br>

### If no song is specified, it will default to 'The Sign' by Ace of Base
<img src="images/spotify-this-song, no song given.png" width="1000"><br>
<br><br>


## Alternatively, you can give commands through a text file: 
> node liri.js do-what-it-says
### do-what-it-says, concert-this
<img src="images/do-what-it-says, concert.png" width="1000"><br>
### do-what-it-says, movie-this
<img src="images/do-what-it-says, movie.png" width="1000"><br>
### do-what-it-says, spotify-this-song
<img src="images/do-what-it-says, spotify.png" width="1000"><br>