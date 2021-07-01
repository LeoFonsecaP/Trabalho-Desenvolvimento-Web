import { useUserPermissions } from "./UserPermissions";

function PrivateContent({ requiredPermissions, children }) {
  const userPermissions = useUserPermissions();
  return requiredPermissions.includes(userPermissions) ? <>{children}</> : null;
}

export default PrivateContent;
