const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
  
    return (
      <>
        {parts.map(part => <Part key={part.id} partName={part.name} numExercises={part.exercises} />)}
        <Total parts={parts}/>
      </>
    )
  }
  
  const Part = ({id, partName, numExercises}) => {
  
    return (
      <>
        <p>{partName} {numExercises}</p>
      </>
    )
  }
  
  const Total = ({parts}) => {
  
    const total = parts.reduce(
      (sum, part) => sum += part.exercises,
      0
    )
  
    return (
        <>
        <p><strong>total of {total} excercises</strong></p>
      </>
    )
  }

  const Course = ({courses}) => {
  
      return (
        <>
          <h1>Web development curriculum</h1>
          {courses.map(course => {
            return (
              <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts}/>
              </div>
            )
          })}
        </>
      )
    }

  export default Course