import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
    <div className="w-full max-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-screen justify-items-center content-center">
        <div className="bg-gray-100 w-1/2 h-1/2 text-center p-6">
          {isAuthenticated ? (
            <div>
              <h2>Bienvenido</h2>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <div>
              {showLogin ? (
                <Login onLogin={setIsAuthenticated} />
              ) : (
                <Register />
              )}

              {/* Botón para cambiar entre Login y Registro */}
              <button onClick={() => setShowLogin(!showLogin)} className="p-6">
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
