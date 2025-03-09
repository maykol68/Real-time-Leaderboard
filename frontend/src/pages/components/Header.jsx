function Header({ onLogout }) {
  return (
    <div className="w-full bg-red-500 flex justify-between p-4">
      <h2 className="text-white font-bold">Bienvenido</h2>
      <button
        onClick={onLogout}
        className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-gray-200"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Header;
