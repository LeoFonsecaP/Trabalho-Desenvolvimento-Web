import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Admin from "./Components/Admin";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
