import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhoneBookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newMessage, setNewMessage] = useState({messageText: '', messageType: ''})

  useEffect(() => {
    PhoneBookService
      .getAll()
      .then((entries) => {
        setPersons(entries)
        setPersonsToShow(entries)
      })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterSearch = (event) => {
    event.preventDefault()

    const searchInput = event.target.value
    const filteredPersons = persons.filter(person => {
      return person.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    })
    setPersonsToShow(filteredPersons)
  }

  const nameInPhonebook = (name) => {
    let x = false
    for (const person of persons){
      if (person.name === name){
        x = true
        break
      }
    }
    return x
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    
    if (nameInPhonebook(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const p = persons.find(person => person.name === newName)
        const updatedEntry = { ...p, number: newPhoneNumber }

        PhoneBookService
          .update(p.id, updatedEntry)
          .then((returnedPerson) => {
            setNewMessage({
              messageText:`Phone number of ${newName} updated to number ${newPhoneNumber}`, 
              messageType:'success'
            })
            setTimeout(() => {
              setNewMessage({messageText: '', messageType: ''})
            }, 5000)
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
            setPersonsToShow(personsToShow.map(person => person.id !== p.id ? person : returnedPerson))
          })
          .catch(error => {
            setNewMessage({
              text: error.response.data.error,
              type: "error"
            })
            setTimeout(() => {
              setNewMessage({messageText: '', messageType: ''})
            }, 5000)
          })
          setNewName('')
          setNewPhoneNumber('')
        }
        else {
          setNewMessage({
            messageText:`Entry of ${newName} with number ${newPhoneNumber} cancelled`, 
            messageType:'error'
          })
          setTimeout(() => {
            setNewMessage({messageText: '', messageType: ''})
          }, 5000)
          setNewName('')
          setNewPhoneNumber('')
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      }
      
      PhoneBookService
        .create(newPerson)
        .then((returnedPerson) => {
          setNewMessage({
            messageText:`Added ${returnedPerson.name}`, 
            messageType:'success'
          })
          setTimeout(() => {
            setNewMessage({messageText: '', messageType: ''})
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(personsToShow.concat(returnedPerson))
        })
        .catch(error => {
          setNewMessage({
            text: error.response.data.error,
            type: "error"
          })
          setTimeout(() => {
            setNewMessage({messageText: '', messageType: ''})
          }, 5000)
        })
        setNewName('')
        setNewPhoneNumber('')
    }
  }

  const deletePerson = (id) => {
    const p = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${p.name} ?`)) {
      PhoneBookService
        .deleteNumber(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToShow(personsToShow.filter(person => person.id !== id))
        })
        .catch(error => {
          setNewMessage({
            messageText:`Information of ${p.name} has already been removed from the server`, 
            messageType:'error'
          })
          setTimeout(() => {
            setNewMessage({messageText: '', messageType: ''})
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToShow(personsToShow.filter(person => person.id !== id))
        })

        setNewMessage({
          messageText:`Information of ${p.name} has been deleted`, 
          messageType:'success'
        })
        setTimeout(() => {
          setNewMessage({messageText: '', messageType: ''})
        }, 5000)
    }
    else {
      setNewMessage({
        messageText:`Delete of ${p.name} cancelled`, 
        messageType:'error'
      })
      setTimeout(() => {
        setNewMessage({messageText: '', messageType: ''})
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={newMessage} />
        <Filter handleChange={handleFilterSearch} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={addNewPerson} name={newName} handleName={handleNewNameChange} number={newPhoneNumber} handleNumber={handleNewPhoneNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App