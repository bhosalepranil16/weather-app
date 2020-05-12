const express = require('express');
const path = require('path');
const { getWeatherData, getMyLocation } = require('./utils/weather')
require('dotenv').config();
const port = process.env.PORT;

const app = express();
const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));


app.get('/weather',(req,res)=>{
    location = req.query.search;
    if(!location) {
        return
    }
    getWeatherData(location,(data)=>{
        res.send({data});
    })
})

app.get('/my',(req,res)=>{
    const lat = req.query.lat;
    const lon = req.query.lon;

    getMyLocation(lat,lon,(data)=>{
        res.send({data});
    })
});

app.listen(port,()=>{
    console.log(`Server is on port ${port}`);
})

