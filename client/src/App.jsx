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
import SignUp from "./Pages/SignUp"
import UserPermissionsProvider from "./Authentication/UserPermissions";
import { Permissions } from "./Authentication/UserPermissions";
import PrivateRoute from "./Authentication/PrivateRoute";

function App() {
  return (
    <CartProvider>
      <UserPermissionsProvider>
        <Router>
          <div className="App">
            <Header />

            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route exact path="/">
                <Redirect to="/home/" />
              </Route>
              <Route path="/home/:filters?">
                <Home />
              </Route>
              <Route path="/book/:book">
                <Book />
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
                <Login/>
              </PrivateRoute>
              <PrivateRoute
                path="/signup"
                requiredPermissions={[Permissions.GUEST]}
              >
                <SignUp/>
              </PrivateRoute>
              <Route>
                <Redirect to="/home/"/>
              </Route>
            </Switch>

            <Footer />
          </div>
        </Router>
      </UserPermissionsProvider>
    </CartProvider>
  );
}

export default App;
