import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";

const UserInfo = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const [healthCheck, setHealthCheck] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ id: string; name: string; email: string } | null>(null);
  const [adminData, setAdminData] = useState<{ id: string; name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthCheck = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/");
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const data = await res.text();
        setHealthCheck(data);
      } catch (err) {
        setError("Failed to fetch API health check");
        console.error("API error:", err);
      }
    };

    fetchHealthCheck();
  }, []);

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
      setUserData(data.user);
    } catch (err) {
      setError("Failed to fetch user info");
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
      setAdminData(data.user);
    } catch (err) {
      setError("Failed to fetch admin info");
      console.error("API error:", err);
    }
  };

  return (
    <div className="mt-4 p-6 bg-gray-100 shadow-lg rounded-lg w-96 text-center">
      {healthCheck ? <pre className="text-green-600 font-mono text-sm">{healthCheck}</pre> : <p className="text-gray-600 italic">Loading...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {isAuthenticated && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition m-2" onClick={fetchUserInfo}>Test User</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition m-2" onClick={fetchAdminInfo}>Test Admin</button>
          {userData && <p className="text-gray-800 mt-2 font-medium">Welcome {userData.name}</p>}
          {adminData && <p className="text-gray-800 mt-2 font-medium">...or should I say <span className="font-bold text-lg text-purple-700">Admin {adminData.name}</span></p>}
        </>
      )}
    </div>
  );
};

export default UserInfo;