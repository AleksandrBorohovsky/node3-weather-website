const request = require('request')

const forecast = (latitude, longitube, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=218c79e38f13fd630a9bb5deb7766d16&query=' + encodeURIComponent(longitube) + ',' + encodeURIComponent(latitude) + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) { callback('Unable to connect to weather service!', undefined) }
        else if (body.error) { callback('Unable to found location', undefined) }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + " degress out")
        }
    })
}


module.exports = forecast