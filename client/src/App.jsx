import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Cart";

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
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
