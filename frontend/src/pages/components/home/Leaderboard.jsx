import { useState, useEffect } from "react";
import api from "../../../utils/api";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await api.get("/api/v1/scores");
        setScores(response.data);
      } catch (error) {
        console.error("Error al obtener la clasificación:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Clasificación</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Jugador</th>
              <th className="py-2 px-4 border">Juego</th>
              <th className="py-2 px-4 border">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr key={score.id} className="text-center">
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
