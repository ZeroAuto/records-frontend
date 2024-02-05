import React from 'react';

import Spinner from 'react-bootstrap/Spinner';
// import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';

const DataTable = ({data, loading, tableHeaders}) => {
  return (
    <div>
      {loading ?
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        :
        <BootstrapTable keyField="id" data={data} columns={tableHeaders} />
      }
    </div>
  )
}

export default DataTable;
