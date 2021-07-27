import React, { useEffect, useState } from "react";
import AdminTable from "./Table";

function ManageAdmins() {
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    async function fetchAdmins() {
      try {
        setLoadingAdmins(true);
        const response = await fetch("/api/admins");
        const data = await response.json();
        console.log(data);
        setAdmins(data);
        setLoadingAdmins(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAdmins();
  }, []);

  return (
    <div className="card">
      <h2>Gerenciar administradores do sistema</h2>

      <AdminTable admins={admins} loading={loadingAdmins} />
    </div>
  );
}

export default ManageAdmins;
