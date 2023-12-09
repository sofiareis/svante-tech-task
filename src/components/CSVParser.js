import Papa from 'papaparse';
import { useEffect, useState } from 'react';

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
    console.log('er')
    Papa.parse(file, {
      header: false, //true if our file has header row
      complete: (res) => {
        const col = [];
        const values = [];

        res.data.map((d) => {
          col.push(Object.keys(d));
          values.push(Object.values(d))
        })

        console.log('ersefd')
        setData(res.data);
        setCol(col[0]);
        setValues(values);
        console.log(res.data)
      }
    })
  }

  
  return (
    <div className="App">
      <label htmlFor='fileInput'>Upload a different CSV file:</label>
      <input
        type='file'
        id='fileInput'
        name='file'
        accept='.csv'
        onChange={handleFileChange}>
      </input>

      <table>
        <thead>
          <tr>
              {col.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
          </tr>
        </thead>
        <tbody>
            {values.map((value, index) => (
                <tr key={index}>
                  {value.map((rowVal, index) => (
                    <td key={index}>{rowVal}</td>
                  ))}
                </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default CSVParser;
