import React, { useState } from "react";

function AdminAddForm({ submitAction, setAddNewAdminOpen, data }) {
  const [adminData, setAdminData] = useState({
    name: (data && data.name) || "",
    phone: (data && data.phone) || "",
    email: (data && data.email) || "",
    password: (data && data.password) || "",
    passwordConfirmation: (data && data.passwordConfirmation) || "",
  });
  const [showError, setShowError] = useState(false);

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
    // validate data
    if (
      adminData.name &&
      adminData.phone &&
      adminData.email &&
      adminData.password &&
      adminData.passwordConfirmation &&
      adminData.password === adminData.passwordConfirmation
    ) {
      setShowError(false);
      submitAction(adminData);
    } else {
      setShowError(true);
    }
  };

  return (
    <form className="folded-box">
      <h3 className="folded-titulo">
        {data ? "Editar" : "Novo"} administrador
      </h3>
      <label htmlFor="nomeAdmin">Nome</label>
      <input
        type="text"
        id="nomeAdmin"
        name="name"
        placeholder="Nome"
        onChange={handleInputChange}
        className={showError && !adminData.name ? "error" : ""}
      />

      <label htmlFor="telefoneAdmin">Telefone</label>
      <input
        type="text"
        id="telefoneAdmin"
        name="phone"
        placeholder="Telefone"
        onChange={handleInputChange}
        className={showError && !adminData.phone ? "error" : ""}
      />

      <label htmlFor="emailAdmin">E-mail</label>
      <input
        type="email"
        id="emailAdmin"
        name="email"
        placeholder="E-mail"
        onChange={handleInputChange}
        className={showError && !adminData.email ? "error" : ""}
      />

      <label htmlFor="senhaAdmin">Senha</label>
      <input
        type="password"
        id="senhaAdmin"
        name="password"
        placeholder="Senha"
        onChange={handleInputChange}
        className={showError && !adminData.password ? "error" : ""}
      />

      <label htmlFor="confirmarSenhaAdmin">Confirmar Senha</label>
      <input
        type="password"
        id="confirmarSenhaAdmin"
        name="passwordConfirmation"
        placeholder="Confirmar Senha"
        onChange={handleInputChange}
        className={showError && !adminData.passwordConfirmation ? "error" : ""}
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
      {showError && <p className="error">Preencha os campos obrigatórios</p>}
      {showError &&
        adminData.password &&
        adminData.password !== adminData.passwordConfirmation && (
          <p className="error">As senhas não coincidem</p>
        )}
    </form>
  );
}

export default AdminAddForm;
