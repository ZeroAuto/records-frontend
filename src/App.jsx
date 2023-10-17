import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { AppContext } from './components/AppContext';

import RecordsTable from './components/RecordsTable';
import RecordUpdateModal from './components/RecordUpdateModal.jsx';
import TopNav from './components/TopNav.jsx';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [recordModalShown, setShowRecordModal] = useState(false);
  const [currentUser] = useContext(AppContext);

  return (
    <div className="App">
      <RecordUpdateModal
        show={recordModalShown}
        onHandleClose={() => setShowRecordModal(false)}
      />
      <TopNav />
      <Stack className="d-flex">
        {currentUser ?
          <Container className="d-flex justify-content-end p-2">
            <Button
              variant="primary"
              onClick={() => {
                setShowRecordModal(true);
              }}
            >
              Add Record
            </Button>
          </Container>
          :
          null
        }
        <Container>
          <Row className="justify-content-center">
            <Col>
              <RecordsTable />
            </Col>
          </Row>
        </Container>
      </Stack>
    </div>
  );
}

export default App;
