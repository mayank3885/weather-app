const request= require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF5YW5rMzg4NSIsImEiOiJja3k2MDNvYTIwZWx0Mm9ub3czajZjbHl6In0.pdrQjPhg-LrTV4qngne4wA'
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to server',undefined)
        }
        else if (body.features.length===0) {
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode