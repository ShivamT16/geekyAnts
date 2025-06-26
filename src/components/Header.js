
export default function Header({ user, onLogout }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-semibold">
        Welcome, {user.name} ({user.role})
      </h1>
      <button
        onClick={onLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
