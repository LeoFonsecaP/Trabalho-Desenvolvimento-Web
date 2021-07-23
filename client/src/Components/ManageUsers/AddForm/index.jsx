import React, { useState } from "react";

function UserAddForm({ submitAction, setAddNewUserOpen, data }) {
  const [userData, setUserData] = useState({
    county: (data && data.county) || "",
    state: (data && data.state) || "",
    cep: (data && data.cep) || "",
    email: (data && data.email) || "",
    neighbourhood: (data && data.neighbourhood) || "",
    street: (data && data.street) || "",
    number: (data && data.number) || "",
    complement: (data && data.complement) || "",
    isAdmin: (data && data.isAdmin) || "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setUserData({
      ...userData,
      [name]: value,
    });
  };
  

  const submit = (event) => {
    event.preventDefault();
    // validate data is needed
    if (!data) {
      submitAction(userData);
    } else {
      submitAction({ ...data, ...userData });
  };
}

  return (
    <form className="folded-box">
      <h3 className="folded-titulo">{data ? "Editar" : "Novo"} usuário</h3>

      <label htmlFor="emailUser">E-mail</label>
      <input
        type="text"
        id="emailUser"
        name="email"
        placeholder="E-mail"
        value={userData.email}
        onChange={handleInputChange}
      />

      <label htmlFor="countyUser">Cidade</label>
      <input
        type="text"
        id="countyUser"
        name="county"
        placeholder="Cidade"
        value={userData.county}
        onChange={handleInputChange}
      />

      <label htmlFor="stateUser">Estado</label>
      <input
        type="text"
        id="stateUser"
        name="state"
        placeholder="Estado"
        value={userData.state}
        onChange={handleInputChange}
      />

      <label htmlFor="cepUser">CEP</label>
      <input
        type="text"
        id="cepUser"
        name="cep"
        placeholder="CEP"
        value={userData.cep}
        onChange={handleInputChange}
      />

      <label htmlFor="neighbourhoodUser">Bairro</label>
      <input
        type="text"
        id="neighbourhoodUser"
        name="neighbourhood"
        placeholder="Bairro"
        value={userData.neighbourhood}
        onChange={handleInputChange}
      />

      <label htmlFor="streetUser">Rua</label>
      <input
        type="text"
        id="streetUser"
        name="street"
        placeholder="Rua"
        value={userData.street}
        onChange={handleInputChange}
      />

      <label htmlFor="numberUser">Número</label>
      <input
        type="text"
        id="numberUser"
        name="number"
        placeholder="Número"
        value={userData.number}
        onChange={handleInputChange}
      />

      <label htmlFor="complementUser">Complemento</label>
      <input
        type="text"
        id="complementUser"
        name="complement"
        placeholder="Complemento"
        value={userData.complement}
        onChange={handleInputChange}
      />

      <label htmlFor="complementUser">É administrador?</label>
      <input
        type="checkbox"
        id="isAdminUser"
        name="isAdmin"
        checked={userData.isAdmin}
        onChange={handleInputChange}
      />


      <div className="text-right">
        <button
          className="btn-cancel margin-right"
          onClick={() => {
            setAddNewUserOpen(false);
          }}
        >
          Cancelar
        </button>
        <input
          type="submit"
          value="Cadastrar"
          className="btn-principal"
          onClick={submit}
        />
      </div>
    </form>
  );
}

export default UserAddForm;
