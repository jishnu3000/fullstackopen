const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: [3, 'Name has to be atleast 3 characters long']
    },
    number: {
      type: String,
      required: true,
      minLength: [8, 'Number must have 8 characters or more'],
      validate: (v) => {
        return /(\d{2}|\d{3})-\d+/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)