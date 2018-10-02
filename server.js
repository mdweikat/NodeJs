const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

app = express();

console.log(process.env);

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', './views')
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('helperMissing', function() {
  var options = arguments[arguments.length - 1];
  console.log('Unknown field: ' + options.name);

});


app.get('/', (req, res) => {
  res.send('<h1> HomePage </h1>');

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
      'currentYear' : new Date().getFullYear(),
      'name' : 'Murad Dweikat',
      'age' : '24',
      'website' : 'https://fb.me/muraddweikat',
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
