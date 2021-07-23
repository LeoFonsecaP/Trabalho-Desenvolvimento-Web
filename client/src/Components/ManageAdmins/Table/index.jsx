import React from "react";

function AdminTable({ selectRow, admins, loading }) {
  return (
    /*  O usuario deve poder selecionar um administrador e esolher edita-lo ou exclui-lo  */
    <div className="wrapperTable">
      <table id="administradores">
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
          {admins.map((admin) => {
            return (
              <tr key={admin.id} onClick={() => selectRow(admin)}>
                <td>{admin.email}</td>
                <td>{admin.county}</td>
                <td>{admin.state}</td>
                <td>{admin.cep}</td>
                <td>{admin.neighbourhood}</td>
                <td>{admin.street}</td>
                <td>{admin.number}</td>
                <td>{admin.complement}</td>
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
