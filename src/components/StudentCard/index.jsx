import "./style.css";

const StudentCard = ({ display }) => {
  return (
    <div className="container">
      {display.map((item) => (
        <div className="card" key={item.actor}>
          <img className="wizardImg" src={item.image} />
          <div className="info">
            <div>{item.name}</div>
            <div>{item.house}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentCard;
