const express = require('express')
const app = express()

app.use(express.json())

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
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id  = Number(req.params.id)
    console.log(req.params);
    const record = data.find(entry => entry.id === id)
    res.json(record)
})

app.get('/info', (req, res) => {
    let records = data.length
    let date = new Date().toUTCString()

    res.send(`
        <p>Phonebook has info for ${records} people</p>
        <p>${date}</p>
    `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})