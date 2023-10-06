import React from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const DataTable = ({data, loading, tableHeaders}) => {
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
}

export default DataTable;
