import React, { useContext, useEffect, useState } from 'react';
import { fetchRecords, fetchUserRecords } from '../utils/server.js';
import { AppContext } from './AppContext';
import DataTable from './DataTable';

const RecordsTable = ({searchText = ''}) => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [currentUser] = useContext(AppContext);

  useEffect(() => {
    const getData = setTimeout(() => {
      loadRecords();
    }, 500);
    return () => clearTimeout(getData);
  }, [searchText, currentUser]);

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
    let records;
    if (currentUser) {
      records = await fetchUserRecords(searchText);
    } else {
      records = await fetchRecords(searchText);
    }
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
