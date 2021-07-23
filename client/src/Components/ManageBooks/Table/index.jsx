import React from "react";


function BookTable({ selectRow, books, loading }) {
  return (
    /*  O usuario deve poder selecionar um livro e esolher edita-lo ou exclui-lo  */
    <div className="wrapperTable">
      <table id="livros">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Quantidade em estoque</th>
            <th>Quantidade vendida</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id} onClick={() => selectRow(book)}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>R$ {book.price}</td>
                <td>{book.genre}</td>
                <td>{book.availableQuantity}</td>
                <td>{book.soldQuantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && "Carregando..."}
    </div>
  );
}

export default BookTable;
