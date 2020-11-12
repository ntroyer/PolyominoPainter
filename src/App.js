import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'

import Workspace from "./components/workspace.component";
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Polyomino Painter</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link>New Image</Nav.Link>
          <Nav.Link>Load Image</Nav.Link>
          <Nav.Link>Save Image</Nav.Link>
        </Nav>
      </Navbar>
      
      <Route path="/" component={Workspace} />
    </Router>
  );
}

export default App;
