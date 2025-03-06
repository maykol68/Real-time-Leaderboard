import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <div>
      <h1>Datos desde Rails API</h1>
      {data ? <p>{data.message}</p> : <p>Cargando...</p>}
    </div>
  );
}

export default App;
