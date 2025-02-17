import AuthButton from "./LoginButton";
import UserInfo from "./UserInfo";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Tiny Frontend</h1>
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
        <AuthButton />
        <UserInfo />
      </div>
    </div>
  );
};

export default App;