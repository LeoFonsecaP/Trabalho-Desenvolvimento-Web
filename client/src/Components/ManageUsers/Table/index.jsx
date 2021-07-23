import React from "react";

function UserTable({ selectRow, users, loading }) {
  return (
    /*  O usuario deve poder selecionar um cliente e esolher edita-lo ou exclui-lo  */
    <div className="wrapperTable">
      <table id="clientes">
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>CEP</th>
            <th>Bairro</th>
            <th>Rua</th>
            <th>Número</th>
            <th>Complemento</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id} onClick={() => selectRow(user)}>
                <td>{user.email}</td>
                <td>{user.county}</td>
                <td>{user.state}</td>
                <td>{user.cep}</td>
                <td>{user.neighbourhood}</td>
                <td>{user.street}</td>
                <td>{user.number}</td>
                <td>{user.complement}</td>
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
