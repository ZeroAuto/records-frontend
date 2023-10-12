import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { AppContext } from './AppContext.js'

import { login } from '../utils/server.js';

function LoginModal({show, onHandleClose}) {
  const [currentUser, setCurrentUser] = useContext(AppContext);
  const [formState, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const handleLogin = async () => {
    const user = await login(formState.username, formState.password);
    if (user) {
      console.log('login successful');
      setCurrentUser(user);
      resetState();
      onHandleClose();
    }
  };
  const handleClose = () =>{
    resetState();
    onHandleClose(false);
  }
  const handleFormChange = (e) => {
    const {id, value} = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const resetState = () => setUserInfo({
    username: '',
    password: '',
  })

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email or Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              id="username"
              value={formState.username}
              onChange={handleFormChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password here"
              id="password"
              value={formState.password}
              onChange={handleFormChange}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
