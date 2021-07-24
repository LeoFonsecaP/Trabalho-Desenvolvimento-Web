import React, { useState } from "react";

function BookAddForm({ submitAction, setAddNewBookOpen, data }) {
  const [bookData, setBookData] = useState({
    title: (data && data.title) || "",
    author: (data && data.author) || "",
    coverUrl: (data && data.coverUrl) || "",
    coverPath: (data && data.coverPath) || "",
    previewUrl: (data && data.previewUrl) || "",
    previewPath: (data && data.previewPath) || "",
    description: (data && data.description) || "",
    genre: (data && data.genre) || "",
    price: (data && data.price) || "",
    availableQuantity: (data && data.availableQuantity) || "",
    soldQuantity: 0,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let imgResource = "";
    if (name === "coverPath" || name === "previewPath") {
      imgResource = name.replace("Path", "Url");
      console.log(imgResource);
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = () => {
        console.log(reader.result);
        setBookData({
          ...bookData,
          [imgResource]: reader.result,
        });
      };
    }

    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    // validate data is needed
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

      <label htmlFor="authorBook">Autor</label>
      <input
        type="text"
        id="authorBook"
        name="author"
        value={bookData.author}
        placeholder="Autor"
        onChange={handleInputChange}
      />

      <div className="row">
        <label htmlFor="coverPathBook">Capa</label>
        {bookData.coverUrl !== "" && (
          <img src={bookData.coverUrl} alt="Book cover" />
        )}
        <input
          type="file"
          id="coverPathBook"
          name="coverPath"
          value={bookData.coverPath}
          placeholder="coverPath"
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <label htmlFor="previewPathBook" className="label">
          Preview
        </label>
        {bookData.previewUrl !== "" && (
          <img src={bookData.previewUrl} alt="Book preview" />
        )}
        <input
          type="file"
          id="previewPathBook"
          name="previewPath"
          value={bookData.previewPath}
          placeholder="previewPath"
          onChange={handleInputChange}
        />
      </div>

      <label htmlFor="genreBook" className="label">
        Genre
      </label>
      <select
        id="genreBook"
        name="genre"
        value={bookData.genre}
        onChange={handleInputChange}
      >
        <option value="" defaultValue disabled>
          Categoria
        </option>
        <option value="Mistério">Mistério</option>
        <option value="Aventura">Aventura</option>
        <option value="Romance">Romance</option>
        <option value="Autoajuda">Autoajuda</option>
        <option value="Direito">Direito</option>
        <option value="Economia">Economia</option>
        <option value="Ciências">Ciências</option>
        <option value="Tecnologia">Tecnologia</option>
      </select>

      <div className="row">
        <label htmlFor="descriptionBook">Descrição</label>
        <textarea
          id="descriptionBook"
          name="description"
          value={bookData.description}
          onChange={handleInputChange}
        />
      </div>

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
        name="availableQuantity"
        value={bookData.availableQuantity}
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
