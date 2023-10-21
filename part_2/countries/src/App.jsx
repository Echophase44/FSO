import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'


function App() {
  const [countries, setCountries] = useState(null)
  const [subFilter, setSubFilter] = useState('')

  const countriesToShow = countries?.filter(element => element.name.common.toLowerCase().includes(subFilter.toLowerCase()))
  const api_key = import.meta.env.VITE_API_KEY
  

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
        console.log(response.data)
      })
  }

  const getWeather = (cityName) => {
    console.log(cityName)
    // api_key
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  }

  return (
    <>
      <div>find countries<input onChange={search}/></div>
      {countriesToShow.length === 1 ? <Country countriesToShow = {countriesToShow} getWeather = {getWeather}/> : <Countries countriesToShow = {countriesToShow} nameSearch = {nameSearch}/>}
      
    </>
  )
}

export default App
