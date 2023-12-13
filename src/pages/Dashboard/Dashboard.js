import React, { useEffect, useRef, useState } from 'react';
import CSVParser from '../../components/CSVParser/CSVParser';
import './Dashboard.css';
import DataTable from '../../components/Table/DataTable';
import GraphColor from '../../components/Graph/GraphColor';
import Dropdown from '../../components/Dropdown/Dropdown';


function Dashboard() {
  const [parsedData, setParsedData] = useState(null);
  const [parsedDataTime, setParsedDataTime] = useState(null);
  const [time, setTime] = useState([]); 
  const [selectTime, setSelectTime] = useState([]);
  const [nodes, setNodes] = useState([]); 
  const [selectNodes, setSelectNode] = useState([]);

  useEffect(() => {
  }, [parsedData, parsedDataTime])

  const onDataParsed = (data) => {
    const col = [];
    data.map((d) => {
      col.push(Object.keys(d));
    })
    setNodes(col[0])
    setParsedData(data);
  }

  const onDataParsedTime = (data) => {
    const col = [];
    data.map((d) => {
      col.push(d);
    })
    setTime(col)
    setParsedDataTime(data);
  }

  const handleTimeSelected = (selectedData) => {
    setSelectTime(selectedData)
  };
  
  const handleNodeSelected = (selectedData) => {
    setSelectNode(selectedData)
  };
  

  return (
    <div className='landing-wrap'>
      <div className='landing'>
        <h1 className='landing-title'>Dashboard</h1>
        {parsedData && parsedDataTime && 
        <div className='landing-graph'>
          <div className='landing-graph-options'>
            <Dropdown data={time} onDataSelected={handleTimeSelected} type={'times'}/>
            <Dropdown data={nodes} onDataSelected={handleNodeSelected} type={'nodes'}/>
          </div>
            <div className='landing-graph-display'>
              <GraphColor dataset={parsedData} time={parsedDataTime} row={selectTime} column={selectNodes}/>
            </div>
        </div>
        }
        <div className='landing-data'>
          <div className='data-col'>
            <h2 className='data-title'>Time Data</h2>
            <CSVParser onDataParsed={onDataParsedTime}/>
            {parsedDataTime && <DataTable data={parsedDataTime} title={'Time (sec)'}/>}
          </div>
          <div className='data-col'>
              <h2 className='data-title'>Concentration Data</h2>
              <CSVParser onDataParsed={onDataParsed}/>
              {parsedData && <DataTable data={parsedData} title={'Node'}/>}   
          </div>
        </div>      
      </div>
    </div>  
  );
}

export default Dashboard;