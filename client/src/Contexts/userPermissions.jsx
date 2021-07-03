import {
  useState,
  useEffect, 
  createContext
} from 'react';

import { getUserPermissions } from '../Mock/authentication';

export const Permissions = {
  GUEST: '0',
  USER: '1',
  ADMIN: '2',
};

export const UserPermissions = createContext({});
function UserPermissionsProvider({ children }) {
  const [userPermissions, setUserPermissions] = useState(Permissions.GUEST);

  useEffect(() => {
    getUserPermissions().then(setUserPermissions);
  }, [])

  return (
      <UserPermissions.Provider value={{userPermissions, setUserPermissions}}>
          {children}
      </UserPermissions.Provider>
  )
}

export default UserPermissionsProvider;
