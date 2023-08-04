const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let data = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    },
]

// GET all notes
app.get('/api/persons', (req, res) => {
    res.json(data)
})

// GET a specific note
app.get('/api/persons/:id', (req, res) => {
    const id  = Number(req.params.id)
    const record = data.find(entry => entry.id === id)
    res.json(record)
})

// GET info page
app.get('/info', (req, res) => {
    let records = data.length
    let date = new Date().toUTCString()

    res.send(`
        <p>Phonebook has info for ${records} people</p>
        <p>${date}</p>
    `)
})

// DELETE a specific note
app.delete('api/persons/:id', (req, res) => {
    const id  = Number(req.params.id)
    data = data.filter(entry => entry.id !== id)

    res.status(204).end()
})

function idExists(id, arr){
    let x = false
    for (const d of data) {
        if(d.id === id){
            x = true
            break
        }
    }
    return x
}

function getRandomId(max) {
    let id = Math.floor(Math.random() * max)
    if (idExists(id, data)) { getRandomId(max) }
    return id;
}

const nameInPhonebook = (name) => {
    let x = false
    for (const d of data){
      if (d.name === name){
        x = true
        break
      }
    }
    return x
}

// POST add a new note
app.post('/api/persons', (req, res) => {
    const entry = req.body
    
    if (!entry.name || !entry.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    } else if (nameInPhonebook(entry.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const id = getRandomId(1000000)
    entry.id = id
    data = data.concat(entry)
    
    res.json(entry)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})