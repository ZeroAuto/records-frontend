import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { AppContext } from './components/AppContext';

import RecordsTable from './components/RecordsTable';
import RecordUpdateModal from './components/RecordUpdateModal.jsx';
import TopNav from './components/TopNav.jsx';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [recordModalShown, setShowRecordModal] = useState(false);
  const [currentUser] = useContext(AppContext);
  const handleSearchTextChange = e => {
    const {value} = e.target;
    setSearchText(value);
  }

  return (
    <div className="App">
      <RecordUpdateModal
        show={recordModalShown}
        onHandleClose={() => setShowRecordModal(false)}
      />
      <TopNav />
      <Stack className="d-flex">
        <Container className="d-flex justify-content-between p-2">
          <Row>
            <Col>
              <Form.Control
                type="seach"
                placeholder="artist or album title"
                id="search-text"
                value={searchText}
                onChange={handleSearchTextChange}
                autoFocus
              />
            </Col>
          </Row>
          {currentUser ?
            <Button
              variant="primary"
              onClick={() => {
                setShowRecordModal(true);
              }}
            >
              Add Record
            </Button>
            :
            null
          }
        </Container>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <RecordsTable searchText={searchText} />
            </Col>
          </Row>
        </Container>
      </Stack>
    </div>
  );
}

export default App;
