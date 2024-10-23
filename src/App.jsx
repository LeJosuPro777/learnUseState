import { useState } from "react";
import "./App.css";

export default function App({ name }) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  const [text, setText] = useState(null);
  const handleChange = (e) => {
    setText(e.target.value);
  }; //para poder cambiar el texto de manera inmediata
  const changeClassName = () => {
    const elements = document.querySelectorAll(".elemento");
    elements.forEach((element) => {
      if (!(element.classList[2] === "esconder")) {
        element.classList.add("esconder");
        return;
      }
      element.classList.remove("esconder");
    });
  };
  return (
    <>
      <div className="elemento contador">
        <p className="cuenta">{count}</p>
        <button onClick={handleClick} className="incremento">
          PRESIONA AQUI!
        </button>
      </div>
      <div className="elemento texto esconder">
        <h1>Escribe algo 😎</h1>
        <input type="text" onChange={handleChange} className="textoJ"/>
        <div className="algoVaAqui">{text}</div>
      </div>
      <button onClick={changeClassName}>Cambiar</button>
    </>
  );
}
