const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);//Otherwise it will find into ./views folder
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather app',
        'name': 'Andrés Q'
    });//renders views/index.hbs
});

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About me',
        'name': 'Andrés Q'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        'message': 'Site under construction',
        'title': 'Help',
        'name': 'Andrés Q'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error });
        }

        forecast(geoData.latitude, geoData.longitud, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                'forecast': forecastData,
                'location': geoData.location,
                'address': req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'You must provide a search term.'
        });
    }

    res.send({
        'products': []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        'errorMessage': 'Help article not found.',
        'title': '404',
        'name': 'Andrés Q'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        'errorMessage': 'Page not found.',
        'title': '404',
        'name': 'Andrés Q'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});