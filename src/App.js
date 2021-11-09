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
    const slytherin = arr.filter((item) => item.house === "Slytherin");
    const ravenclaw = arr.filter((item) => item.house === "Ravenclaw");
    const gryffindor = arr.filter((item) => item.house === "Gryffindor");
    const hufflepuff = arr.filter((item) => item.house === "Hufflepuff");

    const fourHouses = [
      slytherin[Math.floor(Math.random() * slytherin.length)],
      ravenclaw[Math.floor(Math.random() * ravenclaw.length)],
      gryffindor[Math.floor(Math.random() * gryffindor.length)],
      hufflepuff[Math.floor(Math.random() * hufflepuff.length)],
    ];

    const arrDisplay = [];

    while (arrDisplay.length < 3) {
      let wizard = fourHouses[Math.floor(Math.random() * fourHouses.length)];
      if (arrDisplay.indexOf(wizard) === -1) arrDisplay.push(wizard);
    }

    setDisplay(arrDisplay);
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
