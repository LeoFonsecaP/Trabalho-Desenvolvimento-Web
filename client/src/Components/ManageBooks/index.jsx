import React, { useEffect, useState } from "react";
import BookTable from "./Table";
import BookAddForm from "./AddForm";

function ManageBooks() {
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoadingBooks(true);
        const response = await fetch("/api/books");
        const data = await response.json();
        console.log(data);
        setBooks(data);
        setLoadingBooks(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks();
  }, []);

  const [addNewBookOpen, setAddNewBookOpen] = useState(false);

  const addNewBook = async (newBookData) => {
    try {
      const configs = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({
          title: newBookData.title,
          author: newBookData.author,
          coverUrl: newBookData.coverUrl,
          previewUrl: newBookData.previewUrl,
          price: newBookData.price,
          genre: newBookData.genre,
          description: newBookData.description,
          availableQuantity: newBookData.availableQuantity,
          soldQuantity: newBookData.soldQuantity,
        }),
      };
      console.log((configs.body.length * 2) / 1000 / 1000);
      const response = await fetch("/api/books", configs);
      if (response.ok) {
        const data = await response.json();
        const id = data.id;
        setBooks([...books, { ...newBookData, id }]);
        setAddNewBookOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const selectRow = (rowData) => {
    setEditOpen(false);
    setSelected(rowData);
  };

  const editBook = async (newData) => {
    // perform server book edit
    try {
      const configs = {
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({
          title: newData.title,
          author: newData.author,
          coverUrl: newData.coverUrl,
          previewUrl: newData.previewUrl,
          price: newData.price,
          genre: newData.genre,
          description: newData.description,
          availableQuantity: newData.availableQuantity,
          soldQuantity: newData.soldQuantity,
        }),
      };
      console.log(newData.id);
      console.log(`/api/books/${newData.id}`);
      const response = await fetch(`/api/books/${newData.id}`, configs);
      if (response.ok) {
        const booksNew = books.filter((item) => {
          return item.id !== newData.id;
        });
        setSelected(newData);
        setBooks([...booksNew, newData]);
        setEditOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async () => {
    try {
      const configs = {
        method: "DELETE",
        credentials: "include",
      };
      const response = await fetch(`/api/books/${selected.id}`, configs);
      if (response.ok) {
        setBooks(
          books.filter((item) => {
            return item.id !== selected.id;
          })
        );
        setSelected(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Gerenciar livros</h2>

      <BookTable selectRow={selectRow} books={books} loading={loadingBooks} />

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
