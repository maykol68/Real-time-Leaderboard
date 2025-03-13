import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./pages/components/layout/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access-token");
      console.log("Token detectado:", token); // ✅ Verificar si el token se obtiene
      setIsAuthenticated(!!token);
    };

    checkAuth();

    // 🔥 Detectar cambios en localStorage (para otros eventos como logout en otra pestaña)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="w-full min-h-screen bg-blue-300 flex flex-col">
        {isAuthenticated && <Header onLogout={handleLogout} />}

        <div className="flex flex-1 items-center justify-center p-6">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                <AuthScreen
                  isLogin={true}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/register"
              element={
                <AuthScreen
                  isLogin={false}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// ✅ Componente para manejar Login y Registro dinámicamente
const AuthScreen = ({ isLogin, setIsAuthenticated }) => {
  const handleAuthSuccess = () => {
    localStorage.setItem("access-token", "TOKEN_DE_PRUEBA");
    setIsAuthenticated(true);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        {isLogin ? <Login onLogin={handleAuthSuccess} /> : <Register />}

        <button
          onClick={() =>
            (window.location.href = isLogin ? "/register" : "/login")
          }
          className="mt-4 text-blue-500 hover:underline"
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
};

export default App;
