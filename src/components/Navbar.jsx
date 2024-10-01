import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onGroupingChange, onSortingChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [groupingVisible, setGroupingVisible] = useState(false);
  const [orderingVisible, setOrderingVisible] = useState(false);
  const [groupingSelection, setGroupingSelection] = useState('Select');
  const [orderingSelection, setOrderingSelection] = useState('Select');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleGroupingDropdown = () => {
    setGroupingVisible(!groupingVisible);
  };

  const toggleOrderingDropdown = () => {
    setOrderingVisible(!orderingVisible);
  };

  const handleGroupingSelection = (option) => {
    setGroupingSelection(option);
    setGroupingVisible(false); 
    onGroupingChange(option); 
  };

  const handleOrderingSelection = (option) => {
    setOrderingSelection(option);
    setOrderingVisible(false); 
    onSortingChange(option); 
  };

  return (
    <div className="dropdown-container">
      <button className="dropbtn" onClick={toggleDropdown}>
        <img src="/icons_FEtask/Display.svg" alt="Display Icon" className="icon" />
        Display
        <img src="/icons_FEtask/down.svg" alt="Down Icon" />
      </button>

      {dropdownVisible && (
        <div className="dropdown-menu">
          <div className="dropdown-option">
            <button className="option-btn" onClick={toggleGroupingDropdown}>
              Grouping
              <span className='sub-button1'>{groupingSelection}</span>
            </button>
            {groupingVisible && (
              <div className="nested-dropdown">
                <a href="#" onClick={() => handleGroupingSelection('Status')}>Status</a>
                <a href="#" onClick={() => handleGroupingSelection('User')}>User</a>
                <a href="#" onClick={() => handleGroupingSelection('Priority')}>Priority</a>
              </div>
            )}
          </div>

          <div className="dropdown-option">
            <button className="option-btn" onClick={toggleOrderingDropdown}>
              Sorting
              <span className='sub-button'>{orderingSelection}</span>
            </button>
            {orderingVisible && (
              <div className="nested-dropdown">
                <a href="#" onClick={() => handleOrderingSelection('Priority')}>Priority</a>
                <a href="#" onClick={() => handleOrderingSelection('Title')}>Title</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
