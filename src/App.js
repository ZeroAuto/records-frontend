import React, { Fragment, useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import LoginModal from './components/LoginModal.js';
import RecordsTable from './components/RecordsTable.js';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { getCurrentUser } from './utils/auth.js';

const App = () => {
  const [loginModalShown, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

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
            {currentUser ?
              <Fragment>
                <Navbar.Text>
                  Signed in as: <b>{currentUser.name}</b>
                </Navbar.Text>
                <Nav.Link>
                  Logout
                </Nav.Link>
              </Fragment>
              :
              <Nav.Link
                href="#"
                onClick={() => {
                  setShowLoginModal(true)
                }}
              >Sign In</Nav.Link>
            }
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
