import React, { useContext, useEffect, useState } from 'react';
import { fetchRecords, fetchUserRecords } from '../utils/server.js';
import { AppContext } from './AppContext';
import DataTable from './DataTable';

import { on, remove } from '../utils/eventbus.js'

const RecordsTable = ({searchText = ''}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [currentUser] = useContext(AppContext);

  useEffect(() => {
    let debounceDelay;
    initialLoad ? debounceDelay = 0 : debounceDelay = 250;
    const getData = setTimeout(() => {
      loadRecords();
      if (!initialLoad) { setInitialLoad(false) }
    }, debounceDelay);
    return () => clearTimeout(getData);
  }, [searchText, currentUser]);


  // TODO use this pattern with the eventbus that you are going to add
  useEffect(() =>{
    on('reloadRecords', () => loadRecords());
    return () => {
      remove('reloadRecords', () => loadRecords());
    }
  }, []);

  const tableHeaders = [
    {
      dataField: 'artist_name',
      text: 'Artist',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Album',
      sort: true,
    },
    {
      dataField: 'year',
      text: 'Year',
      sort: true,
    },
    {
      dataField: 'format',
      text: 'Format',
      sort: true,
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
