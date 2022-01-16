const request=require('request')

const forecast = (longitude,latitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=99450d0782c89e9a713b6645f84330d7&query='+longitude+','+latitude
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to server',undefined)
        }
        else if (body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions+'.It is currently ' + body.current.temperature + ' degrees out and it feels like ' +body.current.feelslike)
        }
    })
}

module.exports=forecast