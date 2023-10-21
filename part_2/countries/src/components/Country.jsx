const Country = ({countriesToShow}) => {
  //capital, area, languages, flag
  let langArray = []
  let country = countriesToShow[0]
  let name = country.name.common
  let capital = country.capital[0]
  let area = country.area
  let languages = country.languages
  Object.values(languages).forEach((lang) => {
    langArray.push(lang)
  })
  console.log(country)
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