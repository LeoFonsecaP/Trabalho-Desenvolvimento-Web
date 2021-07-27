import { useState, useEffect, createContext } from "react";

export const Permissions = {
  GUEST: "0",
  USER: "1",
  ADMIN: "2",
};

export const UserPermissions = createContext({});
function UserPermissionsProvider({ children }) {
  const [userPermissions, setUserPermissions] = useState(Permissions.GUEST);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoadingAuth(true);
        const response = await fetch("/api/auth", {
          credentials: "include",
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.authenticated) {
            setUserPermissions(
              responseData.isAdmin ? Permissions.ADMIN : Permissions.USER
            );
          } else {
            setUserPermissions(Permissions.GUEST);
          }
        }
        setLoadingAuth(false);
      } catch (error) {
        console.error(error);
        setLoadingAuth(false);
      }
    })();
  }, []);

  return (
    <UserPermissions.Provider
      value={{ userPermissions, setUserPermissions, loadingAuth }}
    >
      {children}
    </UserPermissions.Provider>
  );
}

export default UserPermissionsProvider;
