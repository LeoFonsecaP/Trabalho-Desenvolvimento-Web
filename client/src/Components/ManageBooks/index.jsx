import React, { useEffect, useState } from "react";
import BookTable from "./Table";
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

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const selectRow = (rowData) => {
    setEditOpen(false);
    setSelected(rowData);
  };

  const editBook = (newData) => {
    // perform server book edit

    const booksNew = books.filter((item) => {
      return item.id !== newData.id;
    });
    setSelected(newData);
    setBooks([...booksNew, newData]);
    setEditOpen(false);
  };

  const deleteBook = () => {
    setBooks(
      books.filter((item) => {
        return item.id !== selected.id;
      })
    );
    setSelected(null);
  };

  return (
    <div className="card">
      <h2>Gerenciar livros</h2>

      <BookTable 
      selectRow={selectRow}
      books={books}
      loading={loadingBooks}
      />

      <div className="text-right">
        <button
          className="btn-principal"
          onClick={() => {
            setAddNewBookOpen(!addNewBookOpen);
            if (!addNewBookOpen) {
              setSelected(null);
            }
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

      {/* Manage selected book */}
      {selected && (
        <>
          <h3>Livro:</h3>
          <h4>{selected.title}</h4>
          <button
            style={{ marginRight: 10 }}
            onClick={() => {
              setEditOpen(!editOpen);
            }}
          >
            {editOpen ? "Cancelar" : "Editar"}
          </button>
          <button onClick={deleteBook}>Apagar</button>
        </>
      )}
      {editOpen && (
        <BookAddForm
          submitAction={editBook}
          setAddNewBookOpen={setEditOpen}
          data={selected}
        />
      )}
    </div>
  );
}

export default ManageBooks;
