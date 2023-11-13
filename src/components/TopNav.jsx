import React, { Fragment, useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { AppContext } from './AppContext.jsx';
import { logout } from '../utils/server.js';

import UserModal from './UserModal.jsx';

const TopNav = () => {
  const [userModalShown, setShowUserModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [currentUser, setCurrentUser] = useContext(AppContext);

  const openSignupModal = () => {
    setSignup(true);
    setShowUserModal(true);
  }

  const openLoginModal = () => {
    setSignup(false);
    setShowUserModal(true);
  }

  return (
    <div>
      <UserModal
        show={userModalShown}
        onHandleClose={() => setShowUserModal(false)}
        signup={signup}
      />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">My Record App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {currentUser ?
              <Fragment>
                <Navbar.Text className="p-2">
                  Signed in as: <b>{currentUser.name}</b>
                </Navbar.Text>
                <Nav.Link
                  className="p-2"
                  onClick={async () => {
                    await logout();
                    setCurrentUser();
                  }
                }>
                  logout
                </Nav.Link>
              </Fragment>
              :
              <Fragment>
                <Nav.Link
                  className="p-2"
                  href="#"
                  onClick={() => {
                    openSignupModal();
                  }}
                >
                  Sign Up
                </Nav.Link>
                <Nav.Link
                  className="p-2"
                  href="#"
                  onClick={() => {
                    openLoginModal();
                  }}
                >Log In</Nav.Link>
              </Fragment>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
};

export default TopNav;
