console.log('Starting app.js');

const _ = require('lodash');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .option({
    address: {
      demand: true,
      alias: 'a',
      descibe: 'Address to fetch weather for',
      default: '85215',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


var encodedAddress = encodeURIComponent(argv.address);
var geocodeKey = 'AIzaSyDcnaQ_Z8o6YI4d1jjn4mVAsK2xs0eIiWY';
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeKey}`;

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var weatherKey = '661a1cacdc228c09083aeb0ec725a76c';
    var weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`;

    var formattedAddress = response.data.results[0].formatted_address;
    console.log('Address: ' , formattedAddress);

    return axios.get(weatherUrl);

  })
  .then((response) => {
    if (response.status = 200 && response.statusText === 'OK') {
      console.log('Current Temperature: ', response.data.currently.temperature)
      console.log('Current Weather: ', response.data.currently.summary)
    }
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to conntect to API severs.');
    } else {
      console.log(e.message);
    }
  });
