import React, { useEffect, useState } from 'react';
import { fetchRecords } from '../utils/server.js';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const RecordsTable = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    const records = await fetchRecords();
    setRecords(records);
    setLoading(false);
  }

  return (
    <div>
      {loading ?
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        :
        null
      }
    </div>
  )
};

export default RecordsTable;
