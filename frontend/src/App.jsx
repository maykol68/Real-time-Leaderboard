import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Home";
import Header from "./pages/components/Header";

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
    <div className="w-full max-h-screen flex flex-col items-center bg-gray-100">
      {/* ✅ Agregamos el Header solo si el usuario está autenticado */}
      {isAuthenticated && <Header onLogout={handleLogout} />}

      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-gray-100 w-1/2 h-1/2 text-center p-6">
          {isAuthenticated ? (
            <Dashboard />
          ) : (
            <div>
              {showLogin ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Register />
              )}

              {/* ✅ Botón para cambiar entre Login y Registro */}
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="p-6 text-blue-500 hover:underline"
              >
                {showLogin
                  ? "¿No tienes cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
