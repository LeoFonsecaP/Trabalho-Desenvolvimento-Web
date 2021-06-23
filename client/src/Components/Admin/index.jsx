import React, { useEffect, useState } from "react";
import AdminTable from "../AdminTable";
import AdminAddForm from "../AdminAddForm";

import { getAdmins } from "../../Mock/getAdmins";

function Admin() {
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
    <div className="container">
      <h1>Administrador</h1>
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

      <div className="card">
        <h2>Gerenciar livros</h2>

        {/*  O usuario deve poder selecionar um administrador e esolher edita-lo ou exclui-lo  */}
        <div className="wrapperTable">
          <table id="livros">
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Preço</th>
                <th>Qunatidade em estoque</th>
                <th>Qunatidade vendida</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Harry Potter</td>
                <td>R$ 29.99</td>
                <td>25</td>
                <td>10</td>
              </tr>

              <tr>
                <td>1</td>
                <td>Harry Potter 2</td>
                <td>R$ 59.99</td>
                <td>5</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <button className="btn-principal">Adicionar</button>
        </div>
      </div>

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
