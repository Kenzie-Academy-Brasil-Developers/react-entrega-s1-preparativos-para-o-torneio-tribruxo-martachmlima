import { useState, useEffect } from "react";
import StudentCard from "./components/StudentCard";
import Button from "./components/Button";

import hp from "./hpEdit.png";
import pergaminho from "./pergaminho.png";
import cup from "./cup.png";

import "./App.css";

function App() {
  const [showWizards, setShowWizards] = useState(false);

  const [students, setStudents] = useState([]);

  const [display, setDisplay] = useState([]);

  useEffect(() => {
    fetch("http://hp-api.herokuapp.com/api/characters/students")
      .then((response) => response.json())
      .then((response) =>
        setStudents(response.filter((item) => item.image !== ""))
      )
      .catch((err) => console.log(err));
  }, []);

  function createStudents(arr) {
    const arr2 = [];

    const wizard = arr.filter((item) => item.house === "Slytherin");
    const wizard2 = arr.filter((item) => item.house === "Ravenclaw");
    const wizard3 = arr.filter((item) => item.house === "Gryffindor");

    arr2[0] = wizard[Math.floor(Math.random() * wizard.length)];
    arr2[1] = wizard2[Math.floor(Math.random() * wizard2.length)];
    arr2[2] = wizard3[Math.floor(Math.random() * wizard3.length)];

    setDisplay(arr2);
    setShowWizards(true);
  }

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundImage: `url(${hp})`,
        }}
      >
        {showWizards ? (
          <>
            <img className="cup" src={cup} />
            <StudentCard
              display={display}
              createStudents={createStudents}
              students={students}
            />
            <Button
              createStudents={createStudents}
              students={students}
              text="Tentar de novo"
            />
          </>
        ) : (
          <div className="main">
            <h1 className="title">Torneio Tribruxo</h1>
            <img className="pergaminho" src={pergaminho} />
            <div className="messageStart">
              Clique no botão para encontrar os feiticeiros!
            </div>
            <Button
              createStudents={createStudents}
              students={students}
              text="Começar"
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
