import React, { useState } from "react";

function BookAddForm({ submitAction, setAddNewBookOpen, data }) {
  const [bookData, setBookData] = useState({
    title: (data && data.title) || "",
    price: (data && data.price) || "",
    availableQtd: (data && data.availableQtd) || "",
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

    if (!data) {
      submitAction(bookData);
    } else {
      submitAction({ ...data, ...bookData });
    }
  };

  return (
    <form className="folded-box">
      <h3 className="folded-titulo">Novo administrador</h3>
      <label htmlFor="titleBook">Título</label>
      <input
        type="text"
        id="titleBook"
        name="title"
        value={bookData.title}
        placeholder="Título"
        onChange={handleInputChange}
      />

      <label htmlFor="priceBook">Preço</label>
      <input
        type="text"
        id="priceBook"
        name="price"
        value={bookData.price}
        placeholder="Preço"
        onChange={handleInputChange}
      />

      <label htmlFor="emailAdmin">Itens disponíveis</label>
      <input
        type="text"
        id="availableQtdBook"
        name="availableQtd"
        value={bookData.availableQtd}
        placeholder="Quantidade disponível"
        onChange={handleInputChange}
      />

      <div className="text-right">
        <button
          className="btn-cancel margin-right"
          onClick={() => {
            setAddNewBookOpen(false);
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
