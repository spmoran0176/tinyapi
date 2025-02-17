import { useMsal } from "@azure/msal-react";

const fetchUserGroups = async (accessToken: string): Promise<string[]> => {
  const response = await fetch("https://graph.microsoft.com/v1.0/me/memberOf", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  return data.value.map((group: any) => group.id);
};

export const useAuth = () => {
  const { instance, accounts } = useMsal();

  const getAccessToken = async (): Promise<string | null> => {
    if (accounts.length === 0) return null;

    const request = {
      scopes: ["https://graph.microsoft.com/GroupMember.Read.All"],
      account: accounts[0],
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      console.log("Access Token:", response.accessToken); // TODO: remove after debugging
      return response.accessToken;
    } catch (error) {
      console.error("Token acquisition failed", error);
      return null;
    }
  };

  const getUserGroups = async (): Promise<string[]> => {
    const token = await getAccessToken();
    if (!token) return [];
    return await fetchUserGroups(token);
  };

  return { getAccessToken, getUserGroups };
};
