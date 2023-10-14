const Filter = ({subFilter, handleShown}) => {
  return (
    <div>filter shown with 
        <input 
          value={subFilter}
          onChange={handleShown}/>
      </div>
  )
}

export default Filter