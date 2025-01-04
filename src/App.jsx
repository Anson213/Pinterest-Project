import { useContext } from 'react';
import {Routes, Route} from 'react-router-dom'
import NavColumn from './high-order-component/home/navigation-column.jsx'
import SearchDiv from './high-order-component/home/search-div.jsx'
import SearchExtra from './high-order-component/home/search-extra.jsx'
//import './App.css'
import { PageContext } from './contexts/show-page-context.jsx'
import Home from './pages/home/home.jsx'
import Create from './pages/create/create.jsx'
import Update from './pages/update/update.jsx'
import MoreOption from './pages/more-option/more-option.jsx'
import Message from './pages/message/message.jsx'


function App() {
  const { showPage } = useContext(PageContext);

  const containerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  };

  const leftColumnStyle = {
    height: '100%',
    width: '6%',
    minWidth: '72px',
    backgroundColor: 'gray',
    borderRight: '1px solid black',
    padding: '2.5px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
  };

  const rightColumnStyle = {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'blue',
    overflow: 'hidden',
    width:'94%',
  };

  const searchDivStyle = {
    height: '15%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid black',
    backgroundColor: 'gray',
    zIndex: 2,
  };

  const bottomRowStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'center',
    height:'85%',
    width:'100%'
  };

  const pageWrapperStyle = {
    width: '100%',
    maxWidth: '1300px',
    minWidth: 0,
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  };

  return (
    <div style={containerStyle}>
      {/* Left Column */}
      <div style={leftColumnStyle}>
        <NavColumn />
      </div>

      {/* Main Content */}
      <div style={rightColumnStyle}>
        {/* Search Row */}
        <div style={searchDivStyle}>
          <SearchDiv />
        </div>

        {/* Page Content */}
        <div style={bottomRowStyle}>
          <div style={pageWrapperStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </div>
        </div>

        {/* Conditional Components */}
        {showPage === 'update' && <Update />}
        {showPage === 'more-option' && <MoreOption />}
        {showPage === 'message' && <Message />}
      </div>
    </div>
  );
}

export default App;


          