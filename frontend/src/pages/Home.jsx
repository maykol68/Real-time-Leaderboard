import Dashboard from "./components/home/Dashboard";
import Leaderboard from "./components/home/Leaderboard";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full">
      {/* 📌 Dashboard con ancho fijo */}
      <div className="w-full md:w-1/3">
        <Dashboard />
      </div>

      {/* 📌 Leaderboard ocupa el espacio restante y está centrado */}
      <div className="w-full md:flex-1 flex justify-center">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Home;
