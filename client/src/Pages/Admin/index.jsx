import React from "react";
import ManageAdmins from "../../Components/ManageAdmins";
import ManageBooks from "../../Components/ManageBooks";
import ManageUsers from "../../Components/ManageUsers";

function Admin() {
  return (
    <div className="container">
      <h1>Página de Administrador</h1>
      <ManageAdmins />
      <ManageBooks />
      <ManageUsers />
    </div>
  );
}

export default Admin;
