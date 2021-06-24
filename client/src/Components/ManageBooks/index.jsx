import React, { useEffect, useState } from "react";
import AdminTable from "./Table";
import BookAddForm from "./AddForm";

import { getBooks } from "../../Mock/getBooks";

function ManageBooks() {
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
      setLoadingBooks(true);
      const response = await getBooks();
      setBooks(response);
      setLoadingBooks(false);
    }

    fetchBooks();
  }, []);

  const [addNewBookOpen, setAddNewBookOpen] = useState(false);

  const addNewBook = (newBookData) => {
    // perform server book insert and get new row id...
    const id = books[books.length - 1]?.id + 1;
    setBooks([...books, { ...newBookData, id }]);
    setAddNewBookOpen(false);
  };

  return (
    <div className="card">
      <h2>Gerenciar livros</h2>

      <AdminTable books={books} loading={loadingBooks} />

      <div className="text-right">
        <button
          className="btn-principal"
          onClick={() => {
            setAddNewBookOpen(!addNewBookOpen);
          }}
        >
          {!addNewBookOpen ? "Adicionar" : "Cancelar"}
        </button>
      </div>

      {addNewBookOpen && (
        <BookAddForm
          submitAction={addNewBook}
          setAddNewBookOpen={setAddNewBookOpen}
        />
      )}
    </div>
  );
}

export default ManageBooks;
