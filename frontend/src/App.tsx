import AuthButton from "./LoginButton";
import PresignedUrl from "./PresignedUrl";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg tracking-wide">Tiny Frontend</h1>
      <div className="w-3/4 max-w-full bg-white p-8 rounded-2xl shadow-2xl border-4 border-purple-400 flex flex-col">
        <div className="self-start mb-4">
          <AuthButton />
        </div>
        <div className="text-gray-900 rounded-2xl min-h-[300px] flex flex-col justify-center">
          <PresignedUrl />
        </div>
      </div>
    </div>
  );
};

export default App;
