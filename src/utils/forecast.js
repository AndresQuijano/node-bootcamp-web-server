const request = require('postman-request');

const forecast = (latitude, longitud, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6b8bbe8b91ae6c4b3873f1f1841953cc&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitud)+'&units=m';
    request({url, 'json': true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service!');
        }else if(body.error){
            callback('Unable to find location');
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity: '+ body.current.humidity+'%.');
        }
    });
};
module.exports = forecast;