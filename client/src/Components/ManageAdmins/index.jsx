import React, { useEffect, useState } from "react";
import AdminTable from "./Table";
import AdminAddForm from "./AddForm";

import { getAdmins } from "../../Mock/getAdmins";

function ManageAdmins() {
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    async function fetchAdmins() {
      setLoadingAdmins(true);
      const response = await getAdmins();
      setAdmins(response);
      setLoadingAdmins(false);
    }

    fetchAdmins();
  }, []);

  const [addNewAdminOpen, setAddNewAdminOpen] = useState(false);

  const addNewAdmin = (newAdminData) => {
    // perform server admin insert and get new row id...
    const id = admins[admins.length - 1]?.id + 1;
    setAdmins([...admins, { ...newAdminData, id }]);
    setAddNewAdminOpen(false);
  };

  return (
    <div className="card">
      <h2>Gerenciar administradores do sistema</h2>

      <AdminTable admins={admins} loading={loadingAdmins} />

      <div className="text-right">
        <button
          className="btn-principal"
          onClick={() => {
            setAddNewAdminOpen(!addNewAdminOpen);
          }}
        >
          {!addNewAdminOpen ? "Adicionar" : "Cancelar"}
        </button>
      </div>

      {addNewAdminOpen && (
        <AdminAddForm
          submitAction={addNewAdmin}
          setAddNewAdminOpen={setAddNewAdminOpen}
        />
      )}
    </div>
  );
}

export default ManageAdmins;
