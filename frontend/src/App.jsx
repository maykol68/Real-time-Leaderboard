import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./pages/components/layout/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access-token")
  );
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full min-h-screen bg-blue-300 flex flex-col">
      {/* ✅ Header solo si está autenticado */}
      {isAuthenticated && <Header onLogout={handleLogout} />}

      {/* Contenido principal */}
      <div className="flex flex-1">
        {isAuthenticated ? (
          // 🔹 Dashboard ocupa toda la pantalla sin centrarse
          <div className="flex-1 p-6">
            <Home />
          </div>
        ) : (
          // 🔹 Contenedor centrado para Login / Registro
          <div className="w-full flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
              {showLogin ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Register />
              )}

              {/* ✅ Botón para cambiar entre Login y Registro */}
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="mt-4 text-blue-500 hover:underline"
              >
                {showLogin
                  ? "¿No tienes cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
