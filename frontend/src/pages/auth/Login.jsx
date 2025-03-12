import { useState } from "react";
import api from "../../utils/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const response = await api.post("/auth/sign_in", { email, password });

      console.log("Headers:", response.headers);

      // Buscar headers sin importar mayúsculas/minúsculas
      const headers = response.headers;
      const tokenKey = Object.keys(headers).find(
        (key) => key.toLowerCase() === "access-token"
      );
      const clientKey = Object.keys(headers).find(
        (key) => key.toLowerCase() === "client"
      );
      const uidKey = Object.keys(headers).find(
        (key) => key.toLowerCase() === "uid"
      );

      const token = headers[tokenKey];
      const client = headers[clientKey];
      const uid = headers[uidKey];

      if (token && client && uid) {
        localStorage.setItem("access-token", token);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);

        onLogin(true);
      } else {
        throw new Error("No se recibieron tokens de autenticación.");
      }
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message);
      setError("Credenciales incorrectas o problema en el servidor.");
    }
  };

  return (
    <div className="w-full max-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        <hr className="pb-4" />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
