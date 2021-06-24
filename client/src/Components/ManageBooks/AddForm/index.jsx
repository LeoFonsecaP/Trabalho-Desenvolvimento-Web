import React, { useState } from "react";

function BookAddForm({ submitAction, setAddNewAdminOpen }) {
  const [bookData, setBookData] = useState({
    title: "",
    price: "",
    availableQtd: "",
    soldQtd: 0,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    // validate data is needed
    submitAction(bookData);
  };

  return (
    <form className="folded-box">
      <h3 className="folded-titulo">Novo administrador</h3>
      <label htmlFor="titleBook">Titulo</label>
      <input
        type="text"
        id="titleBook"
        name="title"
        placeholder="Titulo"
        onChange={handleInputChange}
      />

      <label htmlFor="priceBook">Preço</label>
      <input
        type="text"
        id="priceBook"
        name="price"
        placeholder="Preço"
        onChange={handleInputChange}
      />

      <label htmlFor="emailAdmin">Itens disponiveis</label>
      <input
        type="text"
        id="availableQtdBook"
        name="availableQtd"
        placeholder="Quantidade disponivel"
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

export default BookAddForm;
