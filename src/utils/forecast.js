const request = require("postman-request");

const forecast = (place, callback) => {
   
    url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=e29017f85b81a6e3b694c36c6d101827`;
    request({url:url, json:true}, (error, response) => {
        if (error){
            callback("unable to connect to the api", undefined);
        }else if(response.body.message){
            callback(response.body.message, undefined)
        } else {
            data = response.body;
            callback(undefined, {description:data.weather[0].description, temperature:data.main.temp, feelslike:data.main.feels_like});
        }
    })
}

module.exports = forecast