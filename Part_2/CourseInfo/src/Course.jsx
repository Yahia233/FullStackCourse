const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
const Header = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
      <p>{name} {exercises}</p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Course;
