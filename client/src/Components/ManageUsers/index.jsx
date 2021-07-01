import React, { useEffect, useState } from "react";
import UserTable from "./Table";
import UserAddForm from "./AddForm";

import { getUsers } from "../../Mock/getUsers";

function ManageUsers() {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      const response = await getUsers();
      setUsers(response);
      setLoadingUsers(false);
    }

    fetchUsers();
  }, []);

  const [addNewUserOpen, setAddNewUserOpen] = useState(false);

  const addNewUser = (newUserData) => {
    // perform server user insert and get new row id...
    const id = users[users.length - 1]?.id + 1;
    setUsers([...users, { ...newUserData, id }]);
    setAddNewUserOpen(false);
  };

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const selectRow = (rowData) => {
    setEditOpen(false);
    setSelected(rowData);
  };

  const editUser = (newData) => {
    // perform server user edit

    const userNew = users.filter((item) => {
      return item.id !== newData.id;
    });
    setSelected(newData);
    setUsers([...userNew, newData]);
    setEditOpen(false);
  };

  const deleteUser = () => {
    setUsers(
      users.filter((item) => {
        return item.id !== selected.id;
      })
    );
    setSelected(null);
  };

  return (
    <div className="card">
      <h2>Gerenciar usuários</h2>

      <UserTable
       selectRow={selectRow}
       users={users}
       loading={loadingUsers} 
       />

      <div className="text-right">
        <button
          className="btn-principal"
          onClick={() => {
            setAddNewUserOpen(!addNewUserOpen);
            if (!addNewUserOpen) {
              setSelected(null);
            }
          }}
        >
          {!addNewUserOpen ? "Adicionar" : "Cancelar"}
        </button>
      </div>

      {addNewUserOpen && (
        <UserAddForm
          submitAction={addNewUser}
          setAddNewUserOpen={setAddNewUserOpen}
        />
      )}
      {/* Manage selected user user */}
      {selected && (
        <>
          <h3>Usuário:</h3>
          <h4>{selected.name}</h4>
          <button
            style={{ marginRight: 10 }}
            onClick={() => {
              setEditOpen(!editOpen);
            }}
          >
            {editOpen ? "Cancelar" : "Editar"}
          </button>
          <button onClick={deleteUser}>Apagar</button>
        </>
      )}
      {editOpen && (
        <UserAddForm
          submitAction={editUser}
          setAddNewUserOpen={setEditOpen}
          data={selected}
        />
      )}
    </div>
  );
}

export default ManageUsers;
