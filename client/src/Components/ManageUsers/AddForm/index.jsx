import React, { useState } from "react";

function UserAddForm({ submitAction, setAddNewUserOpen, data }) {
  const [userData, setUserData] = useState({
    name: (data && data.name) || "",
    address: (data && data.address) || "",
    phone: (data && data.phone) || "",
    email: (data && data.email) || "",
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
      <label htmlFor="nameUser">Nome</label>
      <input
        type="text"
        id="nameUser"
        name="name"
        placeholder="Nome"
        value={userData.name}
        onChange={handleInputChange}
      />

      <label htmlFor="address">Endereço</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Endereço"
        value={userData.address}
        onChange={handleInputChange}
      />

      <label htmlFor="phoneUser">Telefone</label>
      <input
        type="text"
        id="phoneUser"
        name="phone"
        placeholder="Telefone"
        value={userData.phone}
        onChange={handleInputChange}
      />

      <label htmlFor="emailUseer">E-mail</label>
      <input
        type="text"
        id="emailUser"
        name="email"
        placeholder="E-mail"
        value={userData.email}
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
