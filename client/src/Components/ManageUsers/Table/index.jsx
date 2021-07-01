import React from "react";

function UserTable({ selectRow, users, loading }) {
  return (
    /*  O usuario deve poder selecionar um cliente e esolher edita-lo ou exclui-lo  */
    <div className="wrapperTable">
      <table id="clientes">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id} onClick={() => selectRow(user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && "Carregando..."}
    </div>
  );
}

export default UserTable;
