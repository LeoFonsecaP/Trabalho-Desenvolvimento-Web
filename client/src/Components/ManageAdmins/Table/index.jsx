import React from "react";

function AdminTable({ selectRow, admins, loading }) {
  return (
    /*  O usuario deve poder selecionar um administrador e esolher edita-lo ou exclui-lo  */
    <div className="wrapperTable">
      <table id="administradores">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr key={admin.id} onClick={() => selectRow(admin)}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.phone}</td>
                <td>{admin.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && "Carregando..."}
    </div>
  );
}

export default AdminTable;
