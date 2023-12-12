import React, { useEffect, useRef, useState } from 'react';
import CSVParser from '../../components/CSVParser/CSVParser';
import './Dashboard.css';
import DataTable from '../../components/Table/DataTable';
import GraphColor from '../../components/Graph/GraphColor';
import Dropdown from '../../components/Dropdown/Dropdown';


function Dashboard() {
  const [parsedData, setParsedData] = useState(null);
  const [parsedDataTime, setParsedDataTime] = useState(null);
  const [colorGraph, setColorGraph] = useState(false);
  const [sizeGraph, setSizeGraph] = useState(false);
  const [time, setTime] = useState([]); 
  const [selectTime, setSelectTime] = useState([]);
  const [nodes, setNodes] = useState([]); 
  const [selectNodes, setSelectNode] = useState([]);

  useEffect(() => {
    setSizeGraph(false);
    setColorGraph(false);
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

  const showColorGraph = () => {
    setColorGraph(true);
    setSizeGraph(false);
  }

  const showSizeGraph = () => {
    setSizeGraph(true);
    setColorGraph(false);
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
            <button className='button-graph-select' onClick={showColorGraph}>Color Graph</button>
            <button className='button-graph-select' onClick={showSizeGraph}>Size Graph</button>
            <Dropdown data={time} onDataSelected={handleTimeSelected}/>
            <Dropdown data={nodes} onDataSelected={handleNodeSelected}/>
          </div>
          {colorGraph && 
            <div className='landing-graph-display'>
              <GraphColor dataset={parsedData} time={parsedDataTime} row={selectTime} column={selectNodes}/>
            </div>
          }
          {sizeGraph && 
            <div className='landing-graph-display'>
              <GraphColor dataset={parsedData} time={parsedDataTime} row={selectTime} column={selectNodes} type='size'/>
            </div>
          }
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