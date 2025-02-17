import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

const LoginButton = () => {
  const { instance, accounts } = useMsal();
  const [msalReady, setMsalReady] = useState(false);
  const isAuthenticated = accounts.length > 0;

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await instance.initialize(); 
        await instance.handleRedirectPromise(); 
        setMsalReady(true);
      } catch (err) {
        console.error("Redirect handling error:", err);
      }
    };
    initializeAuth();
  }, [instance]);

  if (isAuthenticated || !msalReady) {
    return null;
  }

  return (
    <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-600 transition-all mt-4" onClick={() => instance.loginRedirect({ scopes: ["User.Read"] })}>
      Login
    </button>
  );
};

export default LoginButton;
