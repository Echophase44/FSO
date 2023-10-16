import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [subFilter, setSubFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const peopleToShow = showAll ? persons : persons.filter(element => element.name.toLowerCase().includes(subFilter.toLowerCase()))

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShown = (event) => {
    setSubFilter(event.target.value)
    if(event.target.value.length !== 0){
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    let shouldAdd = true
    const personObject = {
      name: newPerson,
      number: newNumber
    }

    persons.forEach((element) => {
      if(element.name === personObject.name){
        shouldAdd = false
      }
    })

    if (shouldAdd === true){
      setPersons(persons.concat(personObject))
    } else {
      alert(`${personObject.name} is already added to the phonebook`)
    }

    setNewPerson("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        subFilter={subFilter}
        handleShown={handleShown}
      />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson = {addPerson}
        newPerson = {newPerson}
        newNumber = {newNumber}
        handleNewNumber = {handleNewNumber}
        handleNewPerson = {handleNewPerson}
      />
      <h3>Numbers</h3>
      <ul>
        {peopleToShow.map(person => <Person name = {person.name} number = {person.number} key={person.name}/>)}
      </ul>
    </div>
  )
}

export default App
