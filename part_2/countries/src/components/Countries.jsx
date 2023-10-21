const Countries = ({countriesToShow, nameSearch}) => {
  return (
    <>
      {countriesToShow.length <= 10 ? 
      countriesToShow.map(element => <div key = {element.name.common}>{element.name.common} <button onClick={()=>nameSearch(element.name.common)}>show</button></div>) : 
      <div>Too many matches, specify another filter</div>}
    </>
  )
}

export default Countries