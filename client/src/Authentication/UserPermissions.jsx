import {
  useState,
  useEffect, 
  useContext, 
  useCallback,
  createContext
} from 'react';
import { getUserPermissions } from '../Mock/authentication';

export const Permissions = {
  GUEST: '0',
  USER: '1',
  ADMIN: '2',
};

function useSignal(handler) {
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    handler();
  }, [signal])
  
  const raiseSignal = useCallback(() => {
    setSignal(!signal);
  });

  return raiseSignal;
}


const UserPermissionsContext = createContext({});

export function UserPermissionsProvider({ children }) {
  const [userPermissions, setUserPermissions] = useState(Permissions.GUEST);
  
  const handleUserPermissionsChange = useCallback(() => {
    getUserPermissions().then(setUserPermissions);
  }, []);

  const raiseChangeSignal = useSignal(handleUserPermissionsChange);
  const context = {userPermissions, raiseChangeSignal};
  return (
    <UserPermissionsContext.Provider value={context}>
      {children}
    </UserPermissionsContext.Provider>
  )
}

export function useUserPermissions() {
  const { userPermissions } = useContext(UserPermissionsContext);
  return userPermissions;
}

export function useUserPermissionsChangeSignalRaiser() {
  const { raiseChangeSignal }  = useContext(UserPermissionsContext);
  return raiseChangeSignal;
}

export default UserPermissionsProvider;
