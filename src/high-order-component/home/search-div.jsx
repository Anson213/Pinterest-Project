import { useState, useContext, useEffect } from 'react';
import SearchImg from '../../assets/search.png';
import SearchExtra from './search-extra';
import { OpenCloseBarsContext } from '../../contexts/close-sub-search-bars.jsx';
import CloseImg from '../../assets/cancel.png';

const SearchDiv = () => {
  const Container = {
    height: '100%',
    width: '100%',
    marginLeft: '10px',
    marginRight: '10px',
    zIndex: '3',
  };
  const Row = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  };
  const InputBox = {
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
    width: '90%',
    minWidth: '40px',
  };
  const AccountBox = {
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    border: '1px solid black',
    width: '3.5%',
    minWidth: '48px',
    marginTop: '2.5px',
  };
  const AccOption = {
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    border: '1px solid black',
    width: '2.5%',
    minWidth: '24px',
    marginTop: '15px',
  };
  const InputDiv = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '95%',
    width: '99.99%',
  };
  const IconDiv = {
    display: 'flex',
    paddingRight: '0px',
    marginRight: '10px',
  };
  const Input = {
    height: '85%',
    width: '90%',
    backgroundColor: 'white',
    border: '0px',
    color: 'black',
    outline: 'none',
    marginLeft: '10px',
    borderRadius: '25px',
  };

  const CloseDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '10%',
    cursor: 'pointer',
  };

  const { isSubSearchBarClosed, toggleSubSearchBar } = useContext(OpenCloseBarsContext);
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState(null); // Can be sent to a Context API to change the results in the Results grid

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${searchInput}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClearClick = () => {
    setSearchInput('');
    setData(null); // Optionally clear fetched data
  };

  return (
    <div className='container-fluid' style={Container}>
      <div className="row" style={Row}>
        <div className="col-md-4" style={InputBox}>
          <div style={InputDiv}>
            <div style={IconDiv}>
              <img src={SearchImg} alt='magnification glass' style={{ height: '24px', width: '24px' }} />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress} // Corrected event handler
              placeholder="Search..."
              style={Input}
            />
            <div onClick={() => handleClearClick()} style={CloseDiv}>
              <img src={CloseImg} style={{ height: '16px', width: '16px' }} />
            </div>

            <div>
              {isSubSearchBarClosed ? (
                <span style={{ color: 'red', fontSize: '16px' }}>❌</span>
              ) : (
                <span style={{ color: 'green', fontSize: '16px' }}>✔️</span>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4" style={AccountBox}>
          Box 2
        </div>

        <div className="col-md-4" style={AccOption}>
          Box 3
        </div>
      </div>
      {/* Only show SearchExtra if the sub-search bar is not closed */}
      {isSubSearchBarClosed ? null : <SearchExtra />}
    </div>
  );
};

export default SearchDiv;
