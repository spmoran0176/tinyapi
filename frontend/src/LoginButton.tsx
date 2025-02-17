import { useMsal } from "@azure/msal-react";

const LoginButton = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const firstName = isAuthenticated ? accounts[0].name?.split(" ")[0] : null;

  if (isAuthenticated) {
  return <p className="text-indigo-400 font-semibold">Welcome, {firstName}</p>;
}

  return (
    <button className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-500 transition" onClick={() => instance.loginRedirect({ scopes: ["User.Read"] })}>
      Login
    </button>
  );
};

export default LoginButton;
