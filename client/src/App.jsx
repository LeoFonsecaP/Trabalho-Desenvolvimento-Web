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

function App() {
  return (
    <CartProvider>
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
            <Route path="/checkout">
              <Checkout />
            </Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
