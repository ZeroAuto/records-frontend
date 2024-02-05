import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { AppContext } from './AppContext'

import { addUserToLocalStore } from '../utils/auth.js';
import { login, createUser } from '../utils/server.js';

const UserModal = ({show, onHandleClose, signup = false}) => {
  const initialState = Object.freeze({
    name: '',
    username: '',
    password: '',
    email: '',
  })
  const [, setCurrentUser] = useContext(AppContext);
  const [formState, setUserInfo] = useState(initialState);
  const handleSubmit = async () => {
    let user;
    if (signup) {
      user = await createUser(formState);
    } else {
      user = await login(formState.username, formState.password);
    }

    if (user) {
      console.log('login successful');
      addUserToLocalStore(user);
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
  const resetState = () => setUserInfo(initialState);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {signup ?
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="John Smith"
                id="name"
                value={formState.name}
                onChange={handleFormChange}
                autoFocus
              />
            </Form.Group>
            :
            null
          }
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="username"
              id="username"
              value={formState.username}
              onChange={handleFormChange}
              autoFocus
            />
          </Form.Group>
          {signup ?
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                id="email"
                value={formState.email}
                onChange={handleFormChange}
                autoFocus
              />
            </Form.Group>
            :
            null
          }
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
        <Button variant="primary" onClick={() => {
          handleSubmit();
        }}>
          { signup ? 'Sign Up' : 'Log In'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
