import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

function ActiveFilterButton({ property, filters }) {
  return (
    <Link name={property} to={filters} replace={true}>
      <button className="btn-principal"> {property} </button>
    </Link>
  );
}

function DefaultFilterButton({ property, filters }) {
  return (
    <Link name={property} to={filters} replace={true}>
      <button> {property} </button>
    </Link>
  );
}

function urlQueryStringToFiltersArray(urlQueryString) {
  return new URLSearchParams(decodeURI(urlQueryString)).getAll("filters[]");
}

function filtersArrayToUrlQueryString(filters) {
  return filters
    .reduce((previous, filter) => {
      previous.append("filters[]", filter);
      return previous;
    }, new URLSearchParams())
    .toString();
}

function FilterButton({ property }) {
  const { search } = useLocation();
  let activeFilters = urlQueryStringToFiltersArray(search);
  let Component = null;
  if (activeFilters.includes(property)) {
    activeFilters = activeFilters.filter((value) => value !== property);
    Component = ActiveFilterButton;
  } else {
    activeFilters.push(property);
    Component = DefaultFilterButton;
  }
  const newSearchParams = filtersArrayToUrlQueryString(activeFilters);
  return (
    <Component
      property={property}
      filters={encodeURI(`/books?${newSearchParams}`)}
    />
  );
}

function BookPreview({ title, author, coverUrl, price, id }) {
  return (
    <Link className={"grid-item text-center block-link"} to={`/books/${id}`}>
      <div>
        <h3>{title}</h3>
        <p className="small-font">{author}</p>
        <div className="grid-item-img-wrapper">
          <img src={coverUrl} alt={"Falha ao carregar imagem."} />
        </div>
        <p>Preço: R${price}</p>
      </div>
    </Link>
  );
}

function BooksList({ filters }) {
  const [state, setState] = useState({
    books: [],
    isLoading: true,
    errorOccurred: false,
  });

  const fetchBooks = useCallback(async () => {
    const queryString = filtersArrayToUrlQueryString(filters);
    try {
      let uri = "http://127.0.0.1:3333/api/books";
      if (queryString !== "") {
        uri += `?${queryString}`;
      }
      const response = await fetch(uri);
      const data = await response.json();
      setState({
        books: data,
        isLoading: false,
        errorOccurred: false,
      });
    } catch (error) {
      setState({
        books: [],
        isLoading: false,
        errorOccurred: true,
      });
    }
  }, [filters]);

  useEffect(fetchBooks, [fetchBooks]);

  console.log(state.books);
  if (state.isLoading) {
    return <div className="text-center"> Carregando... </div>;
  } else if (state.errorOccurred) {
    return (
      <div className="text-center error-message">
        <p>Falha no carregamento, tente novamente.</p>
        <button className="btn-principal" onClick={fetchBooks}>
          Recarregar
        </button>
      </div>
    );
  } else {
    return (
      <div className="grid">
        {state.books.map((bookProps, idx) => (
          <BookPreview key={idx} {...bookProps} />
        ))}
      </div>
    );
  }
}

function BooksFilterableList() {
  const categories = [
    "Mistério",
    "Aventura",
    "Romance",
    "Autoajuda",
    "Direito",
    "Economia",
    "Ciências",
    "Tecnologia",
  ];

  const { search } = useLocation();
  useEffect(() => {
    (async () => {
      try{
        const response = await fetch('http://127.0.0.1:3333/api/auth');
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    })()
  })
  return (
    <div>
      <hr />
      <div className="flex-box flex-bos-wrap">
        {categories.map((cat) => {
          return <FilterButton key={cat} property={cat} />;
        })}
      </div>
      <hr />
      <BooksList filters={urlQueryStringToFiltersArray(search)} />
    </div>
  );
}

export default BooksFilterableList;
