import Header from "./Header"
import Content from "./Content"
import Total from "./Total"


const Course = ({course}) => {
  return (
    <>
      <Header name = {course.name}/>
      {course.parts.map(part => <Content key={part.id} name = {part.name} exercises = {part.exercises}/>)}
      <Total parts = {course.parts}/>
    </>
    

  )
}

export default Course