import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [age, setAge] = useState();
  
  const handleNameChange = (event) => {
        setName(event.target.value);
    };
  const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };
  const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

  useEffect(() => {

    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });

  }, []);

  return(
    <div>
      
      <h1>Student Management System</h1>

      <h1>Students</h1>
      
      <input placeholder="Name" onChange={handleNameChange}/>
      <br/>
      <input placeholder="Course" onChange={handleCourseChange}/>
      <br/>
      <input placeholder="Age" onChange={handleAgeChange}/>
      <br/>
      <input type="submit" placeholder="Submit"/>

      {/* {students.map((student) => (
        <div key = {student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
        </div>
      ))} */}

    </div>
  );
}

export default App;