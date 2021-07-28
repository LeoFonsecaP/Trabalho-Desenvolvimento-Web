import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import { CartProvider } from "./Contexts/cart";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Book from "./Pages/Book";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserPermissionsProvider, {
  Permissions,
} from "./Contexts/userPermissions";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <CartProvider>
      <Router>
        <UserPermissionsProvider>
          <div className="App">
            <Header />

            <Switch>
              <PrivateRoute
                path="/admin"
                requiredPermissions={[Permissions.ADMIN]}
              >
                <Admin />
              </PrivateRoute>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route exact path="/">
                <Redirect to="/books" />
              </Route>
              <Route path="/books/:book">
                <Book />
              </Route>
              <Route path="/books">
                <Home />
              </Route>
              <PrivateRoute
                path="/checkout"
                requiredPermissions={[Permissions.USER, Permissions.ADMIN]}
              >
                <Checkout />
              </PrivateRoute>
              <PrivateRoute
                path="/login"
                requiredPermissions={[Permissions.GUEST]}
              >
                <Login />
              </PrivateRoute>
              <PrivateRoute
                path="/signup"
                requiredPermissions={[Permissions.GUEST]}
              >
                <SignUp />
              </PrivateRoute>
              <Route>
                <Redirect to="/books" />
              </Route>
            </Switch>

            <Footer />
          </div>
        </UserPermissionsProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
