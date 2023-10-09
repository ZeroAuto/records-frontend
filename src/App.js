import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import LoginModal from './components/LoginModal.js';
import RecordsTable from './components/RecordsTable.js';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loginModalShown, setShowLoginModal] = useState(false);

  return (
    <div className="App">
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
      <Container>
        <Row className="justify-content-center">
          <Col>
            <RecordsTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
