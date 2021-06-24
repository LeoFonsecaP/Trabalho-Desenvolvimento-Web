import React, { useEffect, useState } from "react";
import AdminTable from "./Table";
import BookAddForm from "./AddForm";

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

  return (
    <div className="card">
      <h2>Gerenciar usuarios</h2>

      <AdminTable users={users} loading={loadingUsers} />

      <div className="text-right">
        <button
          className="btn-principal"
          onClick={() => {
            setAddNewUserOpen(!addNewUserOpen);
          }}
        >
          {!addNewUserOpen ? "Adicionar" : "Cancelar"}
        </button>
      </div>

      {addNewUserOpen && (
        <BookAddForm
          submitAction={addNewUser}
          setAddNewUserOpen={setAddNewUserOpen}
        />
      )}
    </div>
  );
}

export default ManageUsers;
