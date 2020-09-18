const request = require('request');


const getWeatherData = (location,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${location}`;
    request({url,json : true},(err,data)=>{
        callback(data.body);
    });
}

const getMyLocation = (lat,lon,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${lat},${lon}`;
    request({url,json : true},(err,data)=>{
        callback(data.body)
    });
}

module.exports = {
    getWeatherData,
    getMyLocation
}
