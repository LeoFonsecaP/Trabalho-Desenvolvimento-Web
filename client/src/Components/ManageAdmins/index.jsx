import React, { useEffect, useState } from "react";
import AdminTable from "./Table";
import AdminForm from "./Form";

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

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const selectRow = (rowData) => {
    setEditOpen(false);
    setSelected(rowData);
  };

  const editAdmin = (newData) => {
    // perform server admin edit

    const adminsNew = admins.filter((item) => {
      return item.id !== newData.id;
    });
    setSelected(newData);
    setAdmins([...adminsNew, newData]);
    setEditOpen(false);
  };

  const deleteAdmin = () => {
    setAdmins(
      admins.filter((item) => {
        return item.id !== selected.id;
      })
    );
    setSelected(null);
  };

  return (
    <div className="card">
      <h2>Gerenciar administradores do sistema</h2>

      <AdminTable
        selectRow={selectRow}
        admins={admins}
        loading={loadingAdmins}
      />

      <div className="text-right">
        <button
          className="btn-principal"
          onClick={() => {
            setAddNewAdminOpen(!addNewAdminOpen);
            if (!addNewAdminOpen) {
              setSelected(null);
            }
          }}
        >
          {!addNewAdminOpen ? "Adicionar" : "Cancelar"}
        </button>
      </div>

      {addNewAdminOpen && (
        <AdminForm
          submitAction={addNewAdmin}
          setAddNewAdminOpen={setAddNewAdminOpen}
        />
      )}

      {/* Manage selected admin user */}
      {selected && (
        <>
          <h3>Administrador:</h3>
          <h4>{selected.name}</h4>
          <button
            style={{ marginRight: 10 }}
            onClick={() => {
              setEditOpen(!editOpen);
            }}
          >
            {editOpen ? "Cancelar" : "Editar"}
          </button>
          <button onClick={deleteAdmin}>Apagar</button>
        </>
      )}
      {editOpen && (
        <AdminForm
          submitAction={editAdmin}
          setAddNewAdminOpen={setEditOpen}
          data={selected}
        />
      )}
    </div>
  );
}

export default ManageAdmins;
