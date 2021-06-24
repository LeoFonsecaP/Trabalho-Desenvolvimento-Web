import React, { useState } from "react";

function BookTable({ books, loading }) {
  const [selected, setSelected] = useState(null);

  const selectRow = (rowData) => {
    setSelected(rowData);
  };

  return (
    /*  O usuario deve poder selecionar um livro e esolher edita-lo ou exclui-lo  */
    <div className="wrapperTable">
      <table id="livros">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Preço</th>
            <th>Quantidade em estoque</th>
            <th>Quantidade vendida</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id} onClick={() => selectRow(book)}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>R$ {book.price}</td>
                <td>{book.availableQtd}</td>
                <td>{book.soldQtd}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && "Carregando..."}

      {selected && "Editar ou apagar: " + selected.name}
    </div>
  );
}

export default BookTable;