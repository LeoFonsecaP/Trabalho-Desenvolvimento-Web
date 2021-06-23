import React, { useState } from "react";

function AdminAddForm({ submitAction, setAddNewAdminOpen }) {
  const [adminData, setAdminData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    // validate data is needed
    submitAction(adminData);
  };

  return (
    <form className="folded-box">
      <h3 className="folded-titulo">
        Novo administrador (só estará visivel ao clicar em "Adicionar")
      </h3>
      <label htmlFor="nomeAdmin">Nome</label>
      <input
        type="text"
        id="nomeAdmin"
        name="name"
        placeholder="Nome"
        onChange={handleInputChange}
      />

      <label htmlFor="telefoneAdmin">Telefone</label>
      <input
        type="text"
        id="telefoneAdmin"
        name="phone"
        placeholder="Telefone"
        onChange={handleInputChange}
      />

      <label htmlFor="emailAdmin">E-mail</label>
      <input
        type="email"
        id="emailAdmin"
        name="email"
        placeholder="E-mail"
        onChange={handleInputChange}
      />

      <label htmlFor="senhaAdmin">Senha</label>
      <input
        type="password"
        id="senhaAdmin"
        name="password"
        placeholder="Senha"
        onChange={handleInputChange}
      />

      <label htmlFor="confirmarSenhaAdmin">Confirmar Senha</label>
      <input
        type="password"
        id="confirmarSenhaAdmin"
        name="passwordConfirmation"
        placeholder="Confirmar Senha"
        onChange={handleInputChange}
      />

      <div className="text-right">
        <button
          className="btn-cancel margin-right"
          onClick={() => {
            setAddNewAdminOpen(false);
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

export default AdminAddForm;
