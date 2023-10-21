const Country = ({countriesToShow, getWeather}) => {
  let langArray = []
  let country = countriesToShow[0]
  let name = country.name.common
  let capital = country.capital[0]
  let area = country.area
  Object.values(country.languages).forEach((lang) => {
    langArray.push(lang)
  })
  getWeather(capital)
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
    </>
  )
}

export default Country