// mock a server response
export async function getAdmins() {
  // mock one second delay from server
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return [
    { id: 1, name: "admin", phone: "12 93456-7890", email: "admin@admin.com" },
    {
      id: 2,
      name: "Fabio Destro",
      phone: "12 12345-6789",
      email: "fbfdestro@usp.br",
    },
  ];
}
