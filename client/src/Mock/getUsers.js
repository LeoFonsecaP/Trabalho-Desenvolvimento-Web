// mock a server response
export async function getUsers() {
  // mock one second delay from server
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return [
    {
      id: 1,
      name: "Leonardo",
      address: "Avenida Paulista",
      phone: "12-93456-7890",
      email: "leo@leo.cm",
    },
    {
      id: 2,
      name: "Cesar",
      address: "Rua da Sorte",
      phone: "12-12345-7890",
      email: "cesar@cesar.com",
    },
  ];
}
