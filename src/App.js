import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'

import NewGame from "./components/game/new-game.component";

function App() {
  return (
    <Router>
      <Navbar bg="light">
        <Navbar.Brand>Polyomino Painter</Navbar.Brand>
      </Navbar>
      <Route path="/" component={NewGame} />
    </Router>
  );
}

export default App;
