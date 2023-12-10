import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import './CSVParser.css'

function CSVParser() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]); 
  const [values, setValues] = useState([]);

  /*
  useEffect(() => {
    const defaultFilePath = process.env.PUBLIC_URL + '/time.csv';
    const defaultFile = new File([''], defaultFilePath, {type: 'text/csv'});
    parseCSV(defaultFile);
  }, [])
  */

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    parseCSV(file);
  };

  //complete: a callback function that is executed when the parsing process is completed successfully
  const parseCSV = (file) => {
    Papa.parse(file, {
      header: false, //true if our file has header row
      complete: (res) => {
        const col = [];
        const values = [];

        res.data.map((d) => {
          col.push(Object.keys(d));
          values.push(Object.values(d))
        })

        setData(res.data);
        setCol(col[0]);
        setValues(values);
      }
    })
  }

  
  return (
    <div className="csvParser">
      <input
        type='file'
        id='fileInput'
        name='file'
        accept='.csv'
        onChange={handleFileChange}>
      </input>

      <table className='table'>
        <thead className='table-header'>
          <tr>
              {col.map((col, index) => (
                <th key={index} className='header-items'>Column {col}</th>
              ))}
          </tr>
        </thead>
        <tbody >
            {values.map((value, index) => (
                <tr key={index} className='table-row'>
                  {value.map((rowVal, index) => (
                    <td key={index} className='row-items'>{rowVal}</td>
                  ))}
                </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default CSVParser;
