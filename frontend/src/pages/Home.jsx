import Dashboard from "./components/home/Dashboard";
import Leaderboard from "./components/home/Leaderboard";

const Home = () => {
  return (
    <div className="flex gap-6 p-6">
      {/* 📌 Dashboard en la izquierda */}
      <div className="">
        <Dashboard />
      </div>

      {/* 📌 Leaderboard en la derecha */}
      <div className="w-1/2">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Home;
