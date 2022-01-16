const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./src/components/geocode.js')
const forecast = require('./src/components/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'./public')
const partialsPath = path.join(__dirname,'./src/partials')

app.set('view engine', '.hbs')

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Mayank'
    })
})

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Mayank'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Mayank'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide search'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Enter address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, place_name }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                'location': place_name,
                'forecast': forecastData
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Mayank',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Mayank',
        errorMessage: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up and running')
})