const path = require("path")
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// expressjs.com!!!
const app=express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aleksandr Borohovskij'
    })
})

app.get('/about',(req,res)=>{
    res.render('about' ,{
        title:'About Me', 
        name:'Aleksandr Borohovskij'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title: 'Weather App',
        name: 'Aleksandr Borohovskij'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                latitude,
                longitude,
                forecast: forecastData
            })
        })
    })
})

app.get('/products',(req,res)=>{
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage:'Help article not found',
        name: 'Aleksandr Borohovskij'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage:'Page not found',
        name: 'Aleksandr Borohovskij'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})