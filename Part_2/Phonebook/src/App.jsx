import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(setPersons)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameExists = persons.some(
      p => p.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName.trim(), number: newNumber.trim() }
    personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(prev => prev.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(err => {
        console.error('Error adding person:', err)
        alert('Failed to add person. Please try again.')
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => setPersons(prev => prev.filter(p => p.id !== id)))
        .catch(() => {
          alert(`Failed to delete ${name}. It may have already been removed.`)
          setPersons(prev => prev.filter(p => p.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />

      <Filter filter={filter} handleFilterChange={e => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={e => setNewNumber(e.target.value)}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App