import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/record');
      setRecords(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">My Record App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="#">Sign In</Nav.Link>
            {/* <Navbar.Text> */}
            {/*   Signed in as: <a href="#login">Mark Otto</a> */}
            {/* </Navbar.Text> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
