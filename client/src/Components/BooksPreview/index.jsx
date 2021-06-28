import { Link, useParams } from 'react-router-dom';
import { getBookPreviews } from '../../Mock/getBooks'
import { useEffect, useState } from 'react';

function ActiveFilterButton({ property, filters }) {
  return (
    <Link
      name={property}
      to={`/home/${filters}`}
      replace={true}
    >
      <button className='btn-principal'> {property} </button>
    </Link>
  );
}

function DefaultFilterButton({ property, filters }) {
  return (
    <Link
      name={property}
      to={`/home/${filters}`}
      replace={true}
    >
      <button> {property} </button>
    </Link>
  );
}

function FilterButton({ property }) {
  const { filters } = useParams();
  const propertyRegex = new RegExp(`${property},`);
  const filterIsEmpty = typeof filters === "undefined";
  if (!filterIsEmpty && filters.search(propertyRegex) !== -1) {
    const link_to = filters.replace(propertyRegex, '');
    return <ActiveFilterButton property={property} filters={link_to}/>;
  } 
  const propertyFiltStr = `${property},`;
  const link_to = filterIsEmpty ? propertyFiltStr : filters + propertyFiltStr;
  return <DefaultFilterButton property={property} filters={link_to}/>;
}

function BookPreview({ title, author, img, price, id }) {
  return (
    <Link
      className={"grid-item text-center block-link"}
      to={`/${id}`}
    >
      <div>
        <h3>{title}</h3>
        <p className="small-font">{author}</p>
        <div className="grid-item-img-wrapper">
            <img src={img} alt={"Falha ao carregar imagem."}/>
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
    errorOccurred: false
  });

  useEffect(() => {
    getBookPreviews(filters)
      .then((bookPreviews) => {
        setState({
          books: bookPreviews,
          isLoading: false,
          errorOccurred: false
        })
      }).catch(() => {
        setState({
          books: [],
          isLoading: false,
          errorOccurred: true,
        })
      })
  }, [filters]);

  const refetchPreview = () => {
    getBookPreviews(filters)
      .then((bookPreviews) => {
        setState({
          books: bookPreviews,
          isLoading: false,
          errorOccurred: false
        })
      }).catch(() => {
        setState({
          books: [],
          isLoading: false,
          errorOccurred: true,
        })
      })
  }

  if (state.isLoading) {
    return <div className="text-center"> Carregando... </div>
  } else if (state.errorOccurred) {
    return (
      <div className="text-center error-message">
        <p>
          Falha no carregamento, tente novamente.
        </p>
        <button className="btn-principal" onClick={refetchPreview}>
          Recarregar
        </button>
      </div>
    );
  } else {
    return (
    <div className="grid">
        {state.books.map((bookProps, idx) => <BookPreview key={idx} {...bookProps}/>)}
    </div>
    )
  }
}

const ALL_FILTERS = [
  "Mistério", 
  "Aventura",
  "Romance",
  "Autoajuda",
  "Direito",
  "Economia",
  "Ciências",
  "Tecnologia"
]

function BooksFilterableList() {
  //const [ filters, setFilters ] = useState({});
  const { filters } = useParams();

  function parseUrlFilters(params) {
    let newFilters = {}
    if (typeof params == "undefined") {
      for (let filter in ALL_FILTERS) {
        newFilters[ALL_FILTERS[filter]] = true;
      }
    } else {
      for (let filter in ALL_FILTERS) {
        newFilters[ALL_FILTERS[filter]] = false;
      }
      const splitted = params.split(",")
      for (let filter in splitted) {
        if (ALL_FILTERS.includes(splitted[filter])) {
          newFilters[splitted[filter]] = true;
        }
      }
    }
    return newFilters;
  }

  return (
    <div>
      <hr/>
      <div className="flex-box flex-bos-wrap">
        <FilterButton property="Mistério"/>
        <FilterButton property="Aventura"/>
        <FilterButton property="Romance"/>
        <FilterButton property="Autoajuda"/>
        <FilterButton property="Direito"/>
        <FilterButton property="Economia"/>
        <FilterButton property="Ciências"/>
        <FilterButton property="Tecnologia"/>
      </div>
      <hr/>
      <BooksList filters={parseUrlFilters(filters)}/>
    </div>
  )
}

export default BooksFilterableList;
