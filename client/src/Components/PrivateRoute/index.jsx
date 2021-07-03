import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserPermissions, Permissions } from "../../Contexts/userPermissions";

function PrivateRoute({ path, requiredPermissions, children }) {
  const { userPermissions } = useContext(UserPermissions);
  if (requiredPermissions.includes(userPermissions)) {
    return (
      <Route path={path}>
        {children}
      </Route>
    );
  } 
  if (
    (userPermissions === Permissions.USER &&
    requiredPermissions.includes(Permissions.ADMIN)) ||
    requiredPermissions.includes(Permissions.GUEST)
  ) {
    return <Redirect to={"/home"}/>
  }
  return <Redirect to={"/login"} push={true}/>;
}

export default PrivateRoute;
