import Papa from 'papaparse';
import './CSVParser.css'

function CSVParser({ onDataParsed }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    parseCSV(file);
  };

  //complete: a callback function that is executed when the parsing process is completed successfully
  const parseCSV = (file) => {
    Papa.parse(file, {
      header: false, //true if our file has header row
      skipEmptyLines: true,
      dynamicTyping: true, // Parse values as numbers
      complete: (res) => {       
        console.log(res.data)
        onDataParsed(res.data)
      }
    })
  }

  return (
    <div className="csvParser">
      <div className='file-input'>
        <input
          type='file'
          id='fileInput'
          name='file'
          accept='.csv'
          onChange={handleFileChange}>
        </input>
      </div>
    </div>
  );
}

export default CSVParser;
