import React, { useEffect, useState } from "react";
import UserTable from "./Table";
import UserAddForm from "./AddForm";

function ManageUsers() {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoadingUsers(true);
        const response = await fetch("http://127.0.0.1:3333/api/users");
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setLoadingUsers(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const selectRow = (rowData) => {
    setEditOpen(false);
    setSelected(rowData);
  };

  const editUser = async (newUserData) => {
    // perform server book edit
    try {
      const configs = {
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({
          email: newUserData.email,
          county: newUserData.county,
          state: newUserData.state,
          cep: newUserData.cep,
          neighbourhood: newUserData.neighbourhood,
          street: newUserData.street,
          number: newUserData.number,
          complement: newUserData.complement,
          isAdmin: newUserData.isAdmin,
        }),
      };
      console.log(newUserData.id);
      console.log(`http://127.0.0.1:3333/api/users/${newUserData.id}`);
      const response = await fetch(
        `http://127.0.0.1:3333/api/users/${newUserData.id}`,
        configs
      );
      if (response.ok) {
        const userNew = users.filter((item) => {
          return item.id !== newUserData.id;
        });
        setSelected(newUserData);
        setUsers([...userNew, newUserData]);
        setEditOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const configs = {
        method: "DELETE",
        credentials: "include",
      };
      const response = await fetch(
        `http://127.0.0.1:3333/api/users/${selected.id}`,
        configs
      );
      if (response.ok) {
        setUsers(
          users.filter((item) => {
            return item.id !== selected.id;
          })
        );
        setSelected(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Gerenciar usuários</h2>

      <UserTable selectRow={selectRow} users={users} loading={loadingUsers} />

      {/* Manage selected user user */}
      {selected && (
        <>
          <h3>Usuário:</h3>
          <h4>{selected.email}</h4>
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
