import "./style.css";

const Button = ({ createStudents, students, text }) => {
  return (
    <>
      <button onClick={() => createStudents(students)}>{text}</button>
    </>
  );
};

export default Button;
