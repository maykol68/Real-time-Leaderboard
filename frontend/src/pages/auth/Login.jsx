import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/sign_in", { email, password });

      const headers = response.headers;
      localStorage.setItem("access-token", headers["access-token"]);
      localStorage.setItem("client", headers["client"]);
      localStorage.setItem("uid", headers["uid"]);

      onLogin(true);
      navigate("/"); // 🔹 Redirige al dashboard
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message);
      setError("Credenciales incorrectas o problema en el servidor.");
    }
  };

  return (
    <div className="w-full max-h-screen flex items-center justify-center bg-gray-100">
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
            className="w-full px-4 py-2 border rounded-lg"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
