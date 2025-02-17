import { useMsal } from "@azure/msal-react";
import { useState } from "react";

const UserInfo = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const [output, setOutput] = useState<string>("Click a button to get started.");

  const fetchHealthCheck = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/");
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      setOutput(`Health: ${data.status}`);
    } catch (err) {
      setOutput("Failed to fetch API health check");
      console.error("API error:", err);
    }
  };

  const fetchUserInfo = async () => {
    if (!isAuthenticated) return;
    try {
      const request = { scopes: [`api://${import.meta.env.VITE_AZURE_BACKEND_CLIENT_ID}/access_as_user`] };
      const response = await instance.acquireTokenSilent(request);
      const res = await fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      setOutput(Object.entries(data.user).map(([key, value]) => `${key}: ${value}`).join("\n"));
    } catch (err) {
      setOutput("Failed to fetch user info");
      console.error("API error:", err);
    }
  };

  const fetchAdminInfo = async () => {
    if (!isAuthenticated) return;
    try {
      const request = { scopes: [`api://${import.meta.env.VITE_AZURE_BACKEND_CLIENT_ID}/access_as_user`] };
      const response = await instance.acquireTokenSilent(request);
      const res = await fetch("http://127.0.0.1:8000/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      setOutput(Object.entries(data.user).map(([key, value]) => `${key}: ${value}`).join("\n"));
    } catch (err) {
      setOutput("Failed to fetch admin info");
      console.error("API error:", err);
    }
  };

  return (
    <div className="mt-4 p-8 bg-gray-100 shadow-lg rounded-lg flex border border-gray-300 w-full max-w-4xl min-h-[300px]">
      <div className="flex flex-col space-y-4 mr-6 w-72">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-500 transition" onClick={fetchHealthCheck}>Health Check</button>
        <button 
          className={`${isAuthenticated ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400 cursor-not-allowed"} text-white px-6 py-3 rounded-md shadow-md transition`} 
          onClick={fetchUserInfo} 
          disabled={!isAuthenticated}>
          User Info
        </button>
        <button 
          className={`${isAuthenticated ? "bg-purple-600 hover:bg-purple-500" : "bg-gray-400 cursor-not-allowed"} text-white px-6 py-3 rounded-md shadow-md transition`} 
          onClick={fetchAdminInfo} 
          disabled={!isAuthenticated}>
          Admin Info
        </button>
      </div>
      <pre className="text-gray-800 p-4 bg-white rounded-md shadow text-base font-mono overflow-x-auto flex-grow border border-gray-300 min-h-[200px] self-start">{output}</pre>
    </div>
  );
};

export default UserInfo;
