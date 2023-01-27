const request = require("postman-request");

const forecast = (place, callback) => {
   
    url = `http://api.weatherstack.com/current?access_key=b93b66eebab5c42e87248158caa20b07&query=${place}`;
    request({url:url, json:true}, (error, response) => {
        if (error){
            callback("unable to connect to the api", undefined);
        }else if(response.body.error){
            callback("Please enter the valid place", undefined)
        } else {
            data = response.body.current;
            callback(undefined, {description:data.weather_descriptions[0], temperature:data.temperature, feelslike:data.feelslike});
        }
    })
}

module.exports = forecast