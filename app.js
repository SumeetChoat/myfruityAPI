const cors = require("cors")
const fruits = require('./fruits.json') //tags the fruits.json folder
const express = require("express")
const app = express()
// const port = 3000

// const logger = require("./logger")
//app.use(logger)


app.use('/fruits', express.json())

//homepage
app.get('/', (req,res) => {
    res.send("Hello fruit API")
})

//fruits page
app.get('/fruits', (req,res) => {
    res.send(fruits)
})

//name
app.get('/fruits/:name', (req,res) => {
    const name = req.params.name.toLowerCase()
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
    if(fruit == undefined){
        //do something
        res.status(404).send()
    }else {
        res.send(fruit)
    }
})

app.post('/fruits', (req,res) => {
  //Check if fruit is in json
  const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase())
  if(fruit != undefined){  
    res.status(409).send()
  }else{
    //Add the fruit to the Json
    fruits.push(req.body)
    res.status(201).send(req.body)
  }
})

app.delete('/fruits/:name', (req,res) => {
    //See if it exists
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.params.name.toLowerCase())
    if(fruit == undefined){
        //Cannot delete nothing
        res.status(404).send()
    }else{
        //delete part
        const indexToDelete = fruits.indexOf(fruit)
        fruits.splice(indexToDelete, 1)
        //To do
        res.status(204).send()
    }
})

// app.listen(port, () => {
//     console.log(`Fruity Api listening on port ${port}`)
// })

module.exports = app;
