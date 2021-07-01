import { Route, Redirect } from "react-router-dom";
import { useUserPermissions, Permissions } from "./UserPermissions";
import PrivateContent from "./PrivateContent";

function PrivateRoute({ path, requiredPermissions, children }) {
  const userPermissions = useUserPermissions();
  if (requiredPermissions.includes(userPermissions)) {
    return (
      <Route path={path}>
        <PrivateContent
          requiredPermissions={requiredPermissions}
        > 
        {children}
        </PrivateContent>
      </Route>
    );
  } 
  if (
    userPermissions === Permissions.USER &&
    (requiredPermissions.includes(Permissions.ADMIN) ||
    requiredPermissions.includes(Permissions.GUEST))
  ) {
    return <Redirect to={"/home"}/>
  }
  return <Redirect to={"/login"}/>
}

export default PrivateRoute;
