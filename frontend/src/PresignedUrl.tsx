import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";

const PresignedUrl: React.FC = () => {
  const [objectName, setObjectName] = useState("");
  const [presignedUrl, setPresignedUrl] = useState("");
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const getPresignedUrl = async () => {
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
      setPresignedUrl(Object.entries(data.user).map(([key, value]) => `${key}: ${value}`).join("\n"));
    } catch (err) {
      setPresignedUrl("Failed to fetch user info");
      console.error("API error:", err);
    }
  };



  return (
    <div className="text-gray-900 rounded-2xl min-h-[300px] flex flex-col justify-center">
      <label className="mb-2">Enter S3 object name (e.g. prefix/object):</label>
      <input
        className="border rounded p-2 mb-4"
        value={objectName}
        onChange={(e) => setObjectName(e.target.value)}
      />
      <button
        className="bg-purple-500 text-white rounded p-2 mb-4 hover:bg-purple-600"
        onClick={getPresignedUrl}
      >
        Get Pre-Signed URL
      </button>
      {presignedUrl && (
        <a
          className="text-blue-600 underline break-all"
          href={presignedUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {presignedUrl}
        </a>
      )}
    </div>
  );
};

export default PresignedUrl;