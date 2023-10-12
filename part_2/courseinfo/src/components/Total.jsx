const Total = ({parts}) => {
  
  let exercisesArray = []
  parts.forEach((element) => {
    exercisesArray.push(element.exercises)
  });

  let total = exercisesArray.reduce((a, b) => a + b, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

export default Total