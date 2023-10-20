const Countries = ({countriesToShow}) => {
  return (
    <>
      {countriesToShow.length <= 10 ? countriesToShow.map(element => <div key = {element.name.common}>{element.name.common}</div>) : <div>Too many matches, specify another filter</div>}
    </>
  )
}

export default Countries