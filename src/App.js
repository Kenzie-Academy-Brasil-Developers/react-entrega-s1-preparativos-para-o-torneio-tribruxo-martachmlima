import { useState, useEffect } from "react";
import StudentCard from "./components/StudentCard";

import "./App.css";

function App() {
  const [showWizards, setShowWizards] = useState(false);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://hp-api.herokuapp.com/api/characters/students")
      .then((response) => response.json())
      .then((response) =>
        setStudents(response.filter((item) => item.image !== ""))
      )
      .catch((err) => console.log(err));
  }, []);

  function createStudents(arr) {
    const display = [];

    for (let i = 0; i < 3; i++) {
      display.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    console.log(display);
    setShowWizards(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        {showWizards ? (
          <StudentCard />
        ) : (
          <div>
            <div>Teste</div>
            <button onClick={() => createStudents(students)}>Começar</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
