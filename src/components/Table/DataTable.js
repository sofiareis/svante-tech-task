import { useEffect, useState } from 'react';
import './DataTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function DataTable({ data, title }) {
  const [col, setCol] = useState([]); 
  const [values, setValues] = useState(data.map((d) => Object.values(d)));
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const col = [];
    data.map((d) => {
      col.push(Object.keys(d));
    })

    setCol(col[0]);
    setSelectedColumns([...col[0].keys()]);
  }, [data])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

 
  const handleColumnSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );

    if (selectedOptions.includes(-1)) {
      //all columns options
      setSelectedColumns([...col.keys()]);
    } else if (selectedOptions.includes(-2)) {
      //Clear option
      setSelectedColumns([]);
    } else {
      setSelectedColumns(selectedOptions);
    }
  };

  const handleDropdownOptionClick = (index) => {
    const updatedColumns = selectedColumns.includes(index)
      ? selectedColumns.filter((colIndex) => colIndex !== index)
      : [...selectedColumns, index];

    setSelectedColumns(updatedColumns);
  };

  const isOptionSelected = (index) => selectedColumns.includes(index);

  return (
    <div className="data-table">
      {data.length > 0 && (
        <div className="data-tble-filter">
          <label className='data-tible-label'>
            Select Columns to Display:
            <div className={`custom-dropdown ${isDropdownOpen ? 'open' : ''}`}>
              <div className="selected-values" onClick={toggleDropdown}>
                {selectedColumns.length === col.length
                  ? 'All Columns'
                  : selectedColumns.map((index) => col[index]).join(', ')}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-options">
                  <div
                  className={isOptionSelected(-1) ? 'selected' : ''}
                    key="-1"
                    onClick={() => handleColumnSelect({ target: { selectedOptions: [{ value: -1 }] } })}
                  >
                    All Columns
                  </div>
                  <div
                    key="-2"
                    onClick={() => handleColumnSelect({ target: { selectedOptions: [{ value: -2 }] } })}
                  >
                    Clear
                  </div>
                  {col.map((column, index) => (
                    <div 
                      key={index} 
                      className={isOptionSelected(index) ? 'selected' : ''}
                      onClick={() => handleDropdownOptionClick(index)}>
                    {column}
                  </div>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>
      )}

      <table className={'table'}>
        <thead className='table-header'>
          <tr>
            {col.map((col, index) => (
              selectedColumns.includes(index) && (
              <th key={index} className={'header-items'}>
                  {title} {title == 'Time (sec)' ? '' : col}
              </th>
            )))}
          </tr>
        </thead>
        <tbody >
            {values.map((value, index) => (
                <tr
                key={index}
                className={'table-row'}
              >
                  {value.map((rowVal, index) => (
                    (selectedColumns.includes(index)) && (
                      <td key={index} className="row-items">
                        {rowVal}
                      </td>
                      )
                  ))}
                </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default DataTable;
