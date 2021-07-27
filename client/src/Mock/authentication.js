import { Permissions } from "../Contexts/userPermissions";

export function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const queryResult = window.localStorage.getItem("registeredUsers");
      const users = queryResult === null ? [] : JSON.parse(queryResult);
      const user = users.find((user) => user.email === email);
      if (typeof user !== "undefined" && user.password === password) {
        const currentUser = { id: user.id, permissions: user.permissions };
        window.sessionStorage.setItem(
          "currentUser",
          JSON.stringify(currentUser)
        );
        resolve(currentUser.permissions);
      } else {
        reject("O Email ou a senha não é válido.");
      }
    }, 500);
  });
}

export function getUserPermissions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const queryResult = window.sessionStorage.getItem("currentUser");
      if (queryResult === null) {
        resolve(Permissions.GUEST);
      } else {
        const { permissions } = JSON.parse(queryResult);
        resolve(permissions);
      }
    }, 500);
  });
}

export async function logoffUser() {
  await fetch("http://127.0.0.1:3333/api/logout", { credentials: "include" });
  return new Promise((resolve) => {
    setTimeout(() => {
      window.sessionStorage.removeItem("currentUser");
      resolve(Permissions.GUEST);
    }, 500);
  });
}

export function registerUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const queryResult = window.localStorage.getItem("registeredUsers");
      const users = queryResult === null ? [] : JSON.parse(queryResult);
      if (users.some((registeredUser) => registeredUser.email === user.email)) {
        reject("Um usuário com esse email já existe.");
      } else {
        window.localStorage.removeItem("registeredUsers");
        users.push({ id: users.length, ...user });
        window.localStorage.setItem("registeredUsers", JSON.stringify(users));
        const currentUser = { id: user.id, permissions: user.permissions };
        window.sessionStorage.setItem(
          "currentUser",
          JSON.stringify(currentUser)
        );
        resolve(currentUser.permissions);
      }
    }, 500);
  });
}
