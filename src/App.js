import logo from './logo.svg';
import { fetchRecords } from './utils/server.js'
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './components/LoginModal.js';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [records, setRecords] = useState([])
  const [loginModalShown, setShowLoginModal] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const records = await fetchRecords();
    setRecords(records);
  }

  return (
    <div className="App">
      {/* <LoginModal show={loginModalShown}  onClose={() => { */}
      {/*   setShowLoginModal(false) */}
      {/* }}/> */}
      <LoginModal
        show={loginModalShown}
        onHandleClose={() => setShowLoginModal(false)}
      />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">My Record App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              href="#"
              onClick={() => {
                setShowLoginModal(true)
              }}
            >Sign In</Nav.Link>
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
