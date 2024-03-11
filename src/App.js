import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables for managing subjects and their study hours
  const [subjects, setSubjects] = useState([]);

  // Function to fetch subjects from local storage on component mount
  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
    if (storedSubjects) {
      setSubjects(storedSubjects);
    }
  }, []);

  // Function to handle adding a new subject
  const addSubject = () => {
    const newSubject = {
      name: '',
      hours: 1
    };
    setSubjects([...subjects, newSubject]);
  };

  // Function to handle updating subject name
  const updateSubjectName = (index, name) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = name;
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  // Function to handle updating study hours for a subject
  const updateStudyHours = (index, amount) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += amount;
    if (updatedSubjects[index].hours < 1) {
      updatedSubjects[index].hours = 1; // Ensure study hours never go below 1
    }
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  // Function to handle removing a subject
  const removeSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  return (
    <div className="App">
      <h1>Education Planner</h1>
      <div className="subject-list">
        <h2>Subjects</h2>
        <button onClick={addSubject}>Add Subject</button>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              <input
                type="text"
                value={subject.name}
                onChange={(e) => updateSubjectName(index, e.target.value)}
                placeholder="Enter subject name"
              />
              <button onClick={() => updateStudyHours(index, 1)}>+</button>
              <span>{subject.hours} hours</span>
              <button onClick={() => updateStudyHours(index, -1)}>-</button>
              <button onClick={() => removeSubject(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
