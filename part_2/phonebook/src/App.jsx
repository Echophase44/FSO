import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [subFilter, setSubFilter] = useState('')
  const [showAll, setShowAll] = useState(false)

  const peopleToShow = showAll ? persons : persons.filter(element => element.name.toLowerCase().includes("ar"))

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShown = (event) => {
    console.log("Filtering")
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
      <div>filter shown with <input onChange={handleShown}/></div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newPerson}
            onChange={handleNewPerson}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNewNumber}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map(person => <Person name = {person.name} number = {person.number} key={person.name}/>)}
      </ul>
    </div>
  )
}

export default App
