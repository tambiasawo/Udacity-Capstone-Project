const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('dist'))

result ={}

const port = 8000 || process.env.PORT

app.get('/', function (req, res){
    res.sendFile('/dist/index.html')
})

app.get('/get', getData)

app.post('/send', sendData)

function sendData(req, res)
{
    result = req.body;
    res.send({message: "good data received"})
    //console.log(result)

}
function getData(req,res) {
    res.send(result)
}



app.listen(port, () => console.log(`Server running on port ${port}`))