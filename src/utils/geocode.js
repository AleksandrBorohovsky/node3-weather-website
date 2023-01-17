const request = require('request')

const geocode = (addres, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(addres) + '.json?access_token=pk.eyJ1IjoiYWxleGFuZHIxNDI1IiwiYSI6ImNreHQwenlmZjE4eGQycG12ZXVpcGZ1OXEifQ.poNnmTRlcEGCPOO0Hv_Dmw'
    request({ url, json: true }, (error, { body }) => {
        if (error) { callback('Unable to connect to weather service!', '') }
        else if (body.features.length === 0) { callback('Unable to found location', '') }
        else {
            callback("", data = {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
