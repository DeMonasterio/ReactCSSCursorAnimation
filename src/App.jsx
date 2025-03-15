import { useState, useEffect, useRef } from "react";
import "./App.css";

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function App() {
  const [squares, setSquares] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const lastSpawnTime = useRef(0);
  const lastMouseMoveTime = useRef(Date.now());
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isRunning) return; //Hace falta explicar?

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceMove = now - lastMouseMoveTime.current;

      const spawnRate = timeSinceMove < 200 ? 50 : 500; //Define la velocidad de movimiento

      if (now - lastSpawnTime.current >= spawnRate) {
        createSquare(mousePosition.current.x, mousePosition.current.y);
        lastSpawnTime.current = now;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning]); //Al basarse sobre isRunning defino cuando se ejecuta

  const createSquare = (x, y) => {
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    const color = getRandomColor();
    const id = `sq-${Date.now()}`;

    setSquares((prevSquares) => [
      ...prevSquares.slice(-20), // Limita el número en pantalla
      { id, x, y, color, randomX, randomY },
    ]);

    setTimeout(() => {
      setSquares((prevSquares) => prevSquares.filter((sq) => sq.id !== id));
    }, 1000);
  };

  const handleMouseMove = (e) => {
    if (!isRunning) return;
    mousePosition.current = { x: e.clientX, y: e.clientY };
    lastMouseMoveTime.current = Date.now();
  };

  return (
    <div className="background" onMouseMove={handleMouseMove}>
      <button className="toggle-btn" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Detener" : "Reanudar"}
      </button>
      {squares.map((square) => (
        <div
          key={square.id}
          className="square"
          style={{
            left: square.x,
            top: square.y,
            backgroundColor: square.color,
            animation: `grow-shrink 1s ease-in-out`,
            "--moveX": `${square.randomX}px`,
            "--moveY": `${square.randomY}px`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
