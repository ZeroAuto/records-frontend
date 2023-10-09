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
        <Table>
          <thead>
            <tr>
              {tableHeaders.map((header, index) =>
                <th key={index}>{header.label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((dataItem, index) =>
              <tr key={`body-${index}`}>
                {tableHeaders.map((header) =>
                  <td key={`${header.name}-${index}`}>{dataItem[header.name]}</td>
                )}
              </tr>
            )}
          </tbody>
        </Table>
      }
    </div>
  )
}

export default DataTable;
