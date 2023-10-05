import logo from './logo.svg';
import { fetchRecords } from './utils/server.js'
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [records, setRecords] = useState([])
  // const [loginModalShown, setShowLoginModal] = useState(false);
  // const showLoginModal = () => setShowLoginModal(true);
  // const hideLoginModal = () => setShowLoginModal(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const records = await fetchRecords();
    setRecords(records);
  }

  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">My Record App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="#">Sign In</Nav.Link>
            {/* <Navbar.Text> */}
            {/*   Signed in as: <a href="#login">Mark Otto</a> */}
            {/* </Navbar.Text> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
