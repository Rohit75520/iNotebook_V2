import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import {Alert} from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  const login = window.localStorage.getItem("isLoggedIn")
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message = "this is created by Rohit.Cheduluri"/>
          <div className="container">
            <Switch>
              <Route exact path="/" element={login ? <Home /> : <login />}>
                <Login />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
