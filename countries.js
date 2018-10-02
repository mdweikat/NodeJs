
const request = require('request');

var getAllCountries = (ca) => {
  return 'awdwa';a
  request({
    url: 'https://restcountries.eu/rest/v2/alpha/ps',
    json: true

  }, (error, response, body) => {
    return body;
    // console.log(body);
  })

};


module.exports =  {
  getAllCountries,
};
