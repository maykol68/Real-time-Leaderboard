import { useState, useEffect } from "react";
import api from "../../../utils/api";

const Dashboard = () => {
  const [games, setGames] = useState([]); // Lista de juegos
  const [selectedGame, setSelectedGame] = useState(""); // Juego seleccionado
  const [points, setPoints] = useState(""); // Puntaje ingresado
  const [message, setMessage] = useState(""); // Mensajes de éxito/error

  // ✅ Cargar los juegos al montar el componente
  useEffect(() => {
    api
      .get("/api/v1/games")
      .then((response) => setGames(response.data))
      .catch((error) => console.error("Error cargando juegos:", error));
  }, []);

  // ✅ Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGame || !points) {
      setMessage("Selecciona un juego y un puntaje válido.");
      return;
    }

    try {
      const response = await api.post("/api/v1/scores", {
        score: {
          game_id: selectedGame, // ID del juego seleccionado
          points: parseInt(points, 10), // Puntaje ingresado
        },
      });

      setMessage("✅ Puntaje registrado exitosamente.");
      setPoints("");
      setSelectedGame("");
    } catch (error) {
      console.error("Error registrando puntaje:", error);
      setMessage("❌ Error al registrar el puntaje.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Registrar Tu Puntaje</h2>

      {/* Mensaje de éxito o error */}
      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 📌 Dropdown para seleccionar juego */}
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Selecciona un juego</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>

        {/* 📌 Campo para ingresar puntaje */}
        <input
          type="number"
          placeholder="Puntaje"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="p-2 border rounded"
          required
        />

        {/* 📌 Botón para enviar el puntaje */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar Puntaje
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
