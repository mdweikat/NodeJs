const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {

    var encodedAddress = encodeURIComponent(address);
    var geocodeKey = 'AIzaSyDcnaQ_Z8o6YI4d1jjn4mVAsK2xs0eIiWY';

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeKey}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'OVER_QUERY_LIMIT') {
        reject('SORRY, We no longer have access to maps api.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });

  });

};

geocodeAddress('85215').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
