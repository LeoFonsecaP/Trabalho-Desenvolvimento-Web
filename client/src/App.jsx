import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Admin from "./Pages/Admin";

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
