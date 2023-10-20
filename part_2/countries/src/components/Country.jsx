const Country = ({countriesToShow}) => {
  //capital, area, languages, flag
  let country = countriesToShow[0]
  let name = country.name.common
  let capital = country.capital[0]
  let area = country.area
  let languages = country.languages
  console.log(languages)
  return (
    <>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages</h3>
      <ul>
        {}
      </ul>
    </>
  )
}

export default Country