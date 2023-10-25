import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { AppContext } from './AppContext';

const SearchRecordModal = ({show, onHandleClose}) => {
  const initialState = Object.freeze({
    name: '',
    artist: '',
  });
  const [formState, setRecordInfo] = useState(initialState);
  const [currentUser] = useContext(AppContext);
  const handleClose = () => {};
  const handleSubmit = () => {};
  const resetState = () => setRecordInfo(initialState);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search Records</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Record Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="record name here"
              id="name"
              value={formState.name}
              onChange={handleFormChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control
              type="artist"
              placeholder="artist name here"
              id="artist"
              value={formState.artist}
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
          Add Record
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default SearchRecordModal;
