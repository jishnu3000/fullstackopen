require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

morgan.token('data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return ''
    }
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// GET all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

// GET a specific person
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(result => {
            res.json(result)
        })
})

// GET info page
app.get('/info', (req, res) => {
    Person.find({}).then(result => {
        res.send(`
            <p>Phonebook has info for ${result.length} people</p>
            <p>${new Date().toUTCString()}</p>
        `)
    })
})

// PUT update a person
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))

})

// DELETE a specific person
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result);
            res.status(204).end()
        })
        .catch(error => next(error))
})

// POST add a new person
app.post('/api/persons', (req, res, next) => {
    const entry = req.body
    
    if (!entry.name || !entry.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }
    
    const person = new Person({
        name: entry.name,
        number: entry.number
    })

    person.save()
        .then(result => {
            res.json(entry)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})