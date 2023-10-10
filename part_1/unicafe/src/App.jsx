import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Stats = ({names, good, bad, neutral, total}) => {
  let average = (good - bad) / total
  let positive = (good / total) * 100
  return (
    <>
      <div>{names[0]}: {good}</div>
      <div>{names[1]}: {neutral}</div>
      <div>{names[2]}: {bad}</div>
      <div>All: {total}</div>
      <div>Average: {isNaN(average) ? 0 : average}</div>
      <div>Positive: {isNaN(positive) ? 0 : positive}%</div>
    </>
  )
}

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const names = ["Good", "Neutral", "Bad"]

  const addTotal = () => {
    let newTotal = total + 1
    setTotal(newTotal)
  }

  const updateGood = () => {
    let newGood = good + 1
    setGood(newGood)
    addTotal()
  }

  const updateNeutral = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
    addTotal()
  }

  const updateBad = () => {
    let newBad = bad + 1
    setBad(newBad)
    addTotal()
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {updateGood} text = {names[0]}/>
      <Button handleClick = {updateNeutral} text = {names[1]}/>
      <Button handleClick = {updateBad} text = {names[2]}/>
      <h2>Statistics</h2>
      <Stats
        names = {names} 
        good = {good}
        neutral = {neutral}
        bad = {bad}
        total = {total}
      />
    </div>
  )
}

export default App
