import React, { useEffect, useState } from 'react';
import { fetchRecords } from '../utils/server.js';
import DataTable from './DataTable';

const RecordsTable = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const tableHeaders = [
    {
      name: 'artist_name',
      label: 'Artist',
      sortable: true,
    },
    {
      name: 'name',
      label: 'Album',
      sortable: true,
    },
    {
      name: 'year',
      label: 'Year',
      sortable: true,
    },
    {
      name: 'format',
      label: 'Format',
      sortable: true,
    },
  ]

  const loadRecords = async () => {
    setLoading(true);
    const records = await fetchRecords();
    setRecords(records);
    setLoading(false);
  }

  return (
    <DataTable
      data={records}
      loading={loading}
      tableHeaders={tableHeaders}
    />
  )
};

export default RecordsTable;
