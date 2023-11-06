import React, { useContext, useEffect, useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { AppContext } from './AppContext'

import { addUserRecord, findRecord, recordPost } from '../utils/server.js';

const RecordUpdateMopdal = ({show, onHandleClose, isEdit = false}) => {
  const initialState = Object.freeze({
    name: '',
    artist: '',
    year: '',
    format: '',
  });
  const [formState, setRecordInfo] = useState(initialState);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [currentUser] = useContext(AppContext);

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchSelectedRecord();
    }, 500);
    return () => clearTimeout(getData);
  }, [formState]);

  const fetchSelectedRecord = async () => {
    if (formState.name && formState.artist) {
      const recordData = {
        name: formState.name,
        artist: formState.artist,
      };
      const record = await findRecord(recordData);
      setSelectedRecord(record);
      console.table(record);
    }
  }

  const closeModal = () => {
    resetState();
    onHandleClose(false);
  }
  const handleAddRecord = async () => {
    try {
      await addUserRecord(selectedRecord.id);
    } catch (e) {
      console.log(e);
    } finally {
      closeModal();
    }
  };
  const handleSubmit = async () => {
    const record = await recordPost(formState);
    if (record) {
      console.log('record successfully created');
      closeModal();
    }
  };
  const handleClose = () =>{
    closeModal();
  }
  const handleFormChange = (e) => {
    const {id, value} = e.target;
    setRecordInfo(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const resetState = () => {
    setRecordInfo(initialState);
    setSelectedRecord({});
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(selectedRecord).length > 0 ?
          <Alert
            // onClick={() => {
            //   handleAddRecord();
            // }}
            onClick={handleAddRecord}
            variant="success"
          >
            This record already exists in our database <Alert.Link>add to your wishlist?</Alert.Link>
          </Alert>
          :
          null
        }
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
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="year"
              placeholder="release year"
              id="year"
              value={formState.year}
              onChange={handleFormChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Format</Form.Label>
            <Form.Control
              type="format"
              placeholder="format here"
              id="format"
              value={formState.format}
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
          { isEdit ? 'Update' : 'Add' }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecordUpdateMopdal;
