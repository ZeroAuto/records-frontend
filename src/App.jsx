import React, { Fragment, useContext, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import { AppContext } from './components/AppContext';
import { logout } from './utils/server.js';

import LoginModal from './components/LoginModal';
import RecordsTable from './components/RecordsTable';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loginModalShown, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useContext(AppContext);

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
                <Nav.Link onClick={async () => {
                  await logout();
                  setCurrentUser();
                }}>
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
