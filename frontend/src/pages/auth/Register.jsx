import { useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth", {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
        confirm_success_url: "http://localhost:5174/login",
      });

      console.log("Respuesta:", res.data);
      setMessage({
        text: "Registro exitoso, revisa tu correo para confirmar la cuenta.",
        type: "success",
      });
    } catch (err) {
      console.error("Error de registro:", err.response?.data || err.message);
      setMessage({
        text: err.response?.data?.errors?.join(", ") || "Error al registrarse",
        type: "error",
      });
    }
  };

  return (
    <div className="w-full max-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>
        <hr className="pb-4" />

        {message.text && (
          <p
            className={`text-center ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="new-password"
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>
        <button className="mt-4 text-blue-500 hover:underline">
          <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
