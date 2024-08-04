/* eslint-disable react/prop-types */

const Content = ({course}) => {
  const {courseName, parts} = course;
  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
    </div>
  );
};

const Total = ({exTotal}) =>{
  return (
    <div>
      <p>Number of exercises {exTotal}</p>
    </div>
  )
}

const App = () => {
  const courseNameAndparts = {
    courseName: 'Half Stack application development',
    parts:[
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    }
    ]
  }
  ;
  const totalOfExercises = courseNameAndparts.parts[0].exercises + courseNameAndparts.parts[1].exercises + courseNameAndparts.parts[2].exercises;
  
  return (
    <div>
      <Content course={courseNameAndparts}/>
      <Total exTotal={totalOfExercises}/> 
    </div>
  )
}

export default App