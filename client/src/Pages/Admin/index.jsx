import React from "react";
import ManageAdmins from "../../Components/ManageAdmins";
import ManageBooks from "../../Components/ManageBooks";

function Admin() {
  return (
    <div className="container">
      <h1>Página de Administrador</h1>

      <ManageAdmins />

      <ManageBooks />

      <div className="card">
        <h2>Gerenciar clientes sistema</h2>

        {/* id, nome, endereço, telefone e email. */}
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
              <tr>
                <td>1</td>
                <td>Leonardo</td>
                <td>Avenida Paulista</td>
                <td>12-93456-7890</td>
                <td>leo@leo.com</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Fabio Destro</td>
                <td>Rua da Sorte</td>
                <td>12-93456-7890</td>
                <td>fbfdestro@usp.br</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <button className="btn-principal">Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
