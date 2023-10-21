import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState(null)
  const [subFilter, setSubFilter] = useState('')

  const countriesToShow = countries?.filter(element => element.name.common.toLowerCase().includes(subFilter.toLowerCase()))
  

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  if(!countries){
    return 
  }

  const search = (event) => {
    event.preventDefault
    setSubFilter(event.target.value)
  }

  const nameSearch = (name) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setSubFilter(response.data.name.common)
      })
  }

  return (
    <>
      <div>find countries<input onChange={search}/></div>
      {countriesToShow.length === 1 ? <Country countriesToShow = {countriesToShow}/> : <Countries countriesToShow = {countriesToShow} nameSearch = {nameSearch}/>}
      
    </>
  )
}

export default App
