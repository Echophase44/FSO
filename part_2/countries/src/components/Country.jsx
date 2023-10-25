import { useEffect } from "react"

const Country = ({countriesToShow, getWeather, weatherData}) => {
  let langArray = []
  let country = countriesToShow[0]
  let name = country.name.common
  let capital = country.capital[0]
  let area = country.area
  Object.values(country.languages).forEach((lang) => {
    langArray.push(lang)
  })

  useEffect(() => {
    getWeather(capital)
  }, [capital])

  return (
    <>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages</h3>
      <ul>
        {langArray.map(lang => <li key = {lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {capital}</h2>
      <p>temperature: {weatherData.temperature} Fahrenheit</p>
      {weatherData.icon === "" ? <></> : <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} />}
      <p>Wind {weatherData.windSpeed} mph</p>
    </>
  )
}

export default Country