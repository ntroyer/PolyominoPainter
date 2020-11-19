import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Workspace from "./components/workspace.component";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Workspace} />
    </Router>
  );
}
