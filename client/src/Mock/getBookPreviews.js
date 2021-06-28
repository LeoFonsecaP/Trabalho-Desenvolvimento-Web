const BookPreviews = [
  {
    id: 1,
    title: "Harry Potter",
    price: "29.99",
    genre: 'Aventura' 
  },
  {
    id: 2,
    title: "Harry Potter 2",
    price: "14.89",
    genre: 'Aventura' 
  },
]

const range = [...Array(40).keys()] 

const Adventure = range.map((idx) => {
  return {
    id: 2 + idx,
    title: `Algum livro de aventura ${idx}`,
    price: Math.random().toFixed(2).toString(),
    genre: 'Aventura' 
  }
})

Adventure = [
    {
      id: 2,
    },

export function getBooksPreview(activeFilters) {

}
