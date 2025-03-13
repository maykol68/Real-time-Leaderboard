import { useState, useEffect } from "react";
import api from "../../../utils/api";
import cable from "../../../utils/cable";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Obtener la lista de juegos
    const fetchGames = async () => {
      try {
        const response = await api.get("/api/v1/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    // Obtener puntajes, filtrando si hay un juego seleccionado
    const fetchScores = async (gameId = null) => {
      try {
        const url = gameId
          ? `/api/v1/scores?game_id=${gameId}`
          : "/api/v1/scores";
        const response = await api.get(url);
        setScores(response.data);
      } catch (error) {
        console.error("Error al obtener la clasificación:", error);
      }
    };

    fetchScores(selectedGame);

    // Suscribirse a Action Cable
    const subscription = cable.subscriptions.create("ScoresChannel", {
      received: (newScore) => {
        console.log("Nuevo puntaje recibido:", newScore);

        if (
          !newScore.id ||
          !newScore.points ||
          !newScore.user_name ||
          !newScore.game_name
        ) {
          console.warn("Puntaje recibido incompleto:", newScore);
          return;
        }

        const formattedScore = {
          id: newScore.id,
          points: newScore.points,
          user: { name: newScore.user_name },
          game: { name: newScore.game_name },
        };

        setScores((prevScores) => {
          const exists = prevScores.some(
            (score) => score.id === formattedScore.id
          );
          return exists ? prevScores : [formattedScore, ...prevScores];
        });
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [selectedGame]);

  return (
    <div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Clasificación</h2>

      {/* Selector de juegos */}
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedGame(e.target.value || null)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los juegos</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-auto rounded-md border">
        <table className="w-full min-w-[400px] border-collapse">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Jugador</th>
              <th className="py-2 px-4 border">Juego</th>
              <th className="py-2 px-4 border">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr key={score.id} className="text-center odd:bg-gray-100">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    {score.user?.name || "Anónimo"}
                  </td>
                  <td className="py-2 px-4 border">
                    {score.game?.name || "Juego desconocido"}
                  </td>
                  <td className="py-2 px-4 border font-bold">{score.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No hay puntajes registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
