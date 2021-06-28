import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Cart";
import Home from './Pages/Home';

function App() {
  return (
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
            <Home/>
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
