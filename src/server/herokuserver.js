
/*
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const { urlencoded, request } = require('express')
const app = express()

const location = 'london'
const pixAPI = '19447411-f6214215cf4f2ec18faaf22e1'
const pixabayURL = `https://pixabay.com/api/?key=${pixAPI}&q=${location}`

app.use(cors())

app.get("/", async (req, res) =>{
    const request = await fetch(pixabayURL);
    try {
        res.json(await request.json())
    } catch (error) {
        console.log(error)
    }
})

app.post('/sendlocation', (req,res)=>{
    const location = req.body
    res.send(location)
})
app.listen(4000, ()=>{
    console.log("listenning on port 4000")
})*/