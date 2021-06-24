// mock a server response
export async function getBooks() {
  // mock one second delay from server
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return [
    {
      id: 1,
      title: "Harry Potter",
      price: "29.99",
      availableQtd: "10",
      soldQtd: "5",
    },
    {
      id: 2,
      title: "Harry Potter 2",
      price: "14.89",
      availableQtd: "7",
      soldQtd: "2",
    },
  ];
}
