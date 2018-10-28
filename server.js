const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 1337;

const API_KEY = 'c5c58670c32db956ece142ae13d1759f';

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// HOME
app.get('/', (req, res) => {
  res.render('home.hbs');
});

// POST
app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(response => {
      let cityName = response.data.name;
      let temp = Math.round(response.data.main.temp);

      if (cityName === undefined) {
        res.render('home.hbs', {
          weather: null,
          error: 'Error, please try again'
        });
      } else {
        let weatherText = `It's ${temp}°C degrees in ${cityName}.`;
        res.render('home.hbs', { weather: weatherText, error: null });
      }
    })
    .catch(e => {
      res.render('home.hbs', {
        weather: null,
        error: 'Something went wrong...'
      });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
