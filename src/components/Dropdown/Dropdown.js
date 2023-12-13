import React, { useEffect, useState } from 'react';
import './Dropdown.css';


function Dropdown({data, onDataSelected, type}) {
  const [item, setItem] = useState([]); 
  const [selectItem, setSelectItem] = useState([]);
  const [isDropdownItemOpen, setIsDropdownItemOpen] = useState(false);

  useEffect(() =>{
    setItem(data)
  }, [data])


  const toggleDropdownItem = () => {
    setIsDropdownItemOpen(!isDropdownItemOpen);
  };

  const handleColumnItemSelect = (e) => {
    const selectedOptions = parseInt(e.target.value);
  
    if (selectedOptions === -1) {
      setSelectItem([...item.keys()]);
      onDataSelected && onDataSelected([...item.keys()]);

    } else {
      setSelectItem([selectedOptions]);
      onDataSelected && onDataSelected([selectedOptions]);
    }
    toggleDropdownItem()
  };

  const handleDropdownItem = (index) => {
      setSelectItem([index]);
      onDataSelected && onDataSelected([index]); 
      toggleDropdownItem()
  };

  const isItemSelected = (index) => selectItem.includes(index);
  
  return (
    <div>
        <label className='dropdown-label'>
          Select over which {type} to display:
          <div className={`dropdown-custom-dropdown ${isDropdownItemOpen ? 'open' : ''}`}>
            <div className="selected-values" onClick={toggleDropdownItem}>
              {selectItem.length === item.length
                ? `Over all ${type}`
                : selectItem.length == 0 
                ? `Select ${type}`
                : selectItem.map((index) => item[index])}
            </div>
            {isDropdownItemOpen && (
              <div className="dropdown-options">
                <div
                className={isItemSelected(-1) ? 'selected' : ''}
                  key="-1"
                  onClick={() => handleColumnItemSelect({ target: { value: -1 } })}
                >
                  Over all {type}
                </div>
                {item.map((column, index) => (
                  <div 
                    key={index} 
                    className={isItemSelected(index) ? 'selected' : ''}
                    onClick={() => handleDropdownItem(index)}>
                  {column}
                </div>
                ))}
              </div>
            )}
          </div>
        </label>
    </div>  
  );
}

export default Dropdown;