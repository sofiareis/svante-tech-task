import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useEffect, useState } from 'react';
import './DataTable.css'

export default function DataTable({data, title}) {
    console.log(data)
    const [values, setValues] = useState([]);
    const [col, setCol] = useState([]); 

    useEffect(() => {
        const col = [];
        data.map((d) => {
          col.push(Object.keys(d));
        })

        setValues(data.map((d) => Object.values(d)))
    
        setCol(col[0]);
    }, [data])

    const rows = values.map((value, index) => value.map((rowVal, index) => rowVal))
    const columns = col.map((col, index) => ({dataKey: index, label: col, width: 120}))


  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} className='table-row' />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width, backgroundColor: '#A3AFC8' }}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {title} {title == 'Time (sec)' ? '' : column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
            
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }


  return (
      <Paper style={{ height: 400, width: '100%', marginTop: '10px' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    );

}