import { useState } from "react";
import api from "../utils/api";

const Dashboard = () => {
  const [game, setGame] = useState("");
  const [points, setPoints] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/scores", {
        score: {
          game: game,
          points: parseInt(points, 10),
        },
      });

      setMessage({ text: "Puntaje enviado con éxito", type: "success" });
      setGame("");
      setPoints("");
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.errors?.join(", ") || "Error al enviar puntaje",
        type: "error",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Registrar Puntaje</h2>

      {message.text && (
        <p className={`text-${message.type === "error" ? "red" : "green"}-500`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre del juego"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Puntaje"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="p-2 border rounded"
          required
        />

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
