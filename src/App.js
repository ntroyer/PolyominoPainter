import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import NewGame from "./components/game/new-game.component";

function App() {
  return (
    <Router>
      <Route path="/" component={NewGame} />
    </Router>
  );
}

export default App;
