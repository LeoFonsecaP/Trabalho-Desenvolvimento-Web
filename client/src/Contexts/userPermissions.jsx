import {
  useState,
  useEffect, 
  createContext
} from 'react';

export const Permissions = {
  GUEST: '0',
  USER: '1',
  ADMIN: '2',
};

export const UserPermissions = createContext({});
function UserPermissionsProvider({ children }) {
  const [userPermissions, setUserPermissions] = useState(Permissions.GUEST);

  useEffect(() => {
    (async () => {
      try{
        const response = await fetch('http://127.0.0.1:3333/api/auth');
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.authenticated) {
            setUserPermissions(responseData.isAdmin ? Permissions.ADMIN : Permissions.USER);
          } else {
            setUserPermissions(Permissions.GUEST);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
      <UserPermissions.Provider value={{userPermissions, setUserPermissions}}>
          {children}
      </UserPermissions.Provider>
  )
}

export default UserPermissionsProvider;
