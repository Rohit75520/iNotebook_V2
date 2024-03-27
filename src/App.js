import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import {Alert} from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import LoginError from "./components/LoginError";
import LoginError from "./components/LoginError";
import Invoice from "./components/Invoice";


function App() {
  const login = JSON.parse(window.localStorage.getItem("isLoggedIn"))
  // console.log(login);
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
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/home" element={login ? <Home /> : <login />}>
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/loginError">
                <LoginError />
              </Route>
              <Route exact path='/invoice'>
                <Invoice />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;