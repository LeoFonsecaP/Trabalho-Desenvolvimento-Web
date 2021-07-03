import { useContext } from "react"
import { UserPermissions } from "../../Contexts/userPermissions"

function PrivateContent({ requiredPermissions, children }) {
  const { userPermissions } = useContext(UserPermissions);
  return requiredPermissions.includes(userPermissions) ? <>{children}</> : null;
}

export default PrivateContent;
