import React from "react";
import ManageAdmins from "../../Components/ManageAdmins";
import ManageBooks from "../../Components/ManageBooks";
import ManageOrders from "../../Components/ManageOrders";
import ManageUsers from "../../Components/ManageUsers";

function Admin() {
  return (
    <div className="container">
      <h1>Página de Administrador</h1>
      <ManageAdmins />
      <ManageBooks />
      <ManageUsers />
      <ManageOrders />
    </div>
  );
}

export default Admin;
