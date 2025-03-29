import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default Logout;
