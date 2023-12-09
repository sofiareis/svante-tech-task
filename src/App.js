import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';
import { useState } from 'react';
import CSVParser from './components/CSVParser';

function App() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]); 
  const [values, setValues] = useState([]);
  //complete: a callback function that is executed when the parsing process is completed successfully
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
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
    <div className="App">
      <CSVParser/>
    </div>
  );
}

export default App;
