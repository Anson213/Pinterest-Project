import { useContext } from 'react';
import {Routes, Route} from 'react-router-dom'
import NavColumn from './high-order-component/home/navigation-column.jsx'
import SearchDiv from './high-order-component/home/search-div.jsx'
import './App.css'
import { PageContext } from './contexts/show-page-context.jsx'
import Home from './pages/home/home.jsx'
import Create from './pages/create/create.jsx'
import Update from './pages/update/update.jsx'
import MoreOption from './pages/more-option/more-option.jsx'
import Message from './pages/message/message.jsx'


function App() {
  
  const { showPage, setShowPage } = useContext(PageContext);

  const leftColumnStyle = {
    height: '100%',
    width: '6%',
    display: 'flex',
    flex: '0',
    flexDirection: 'column',
    backgroundColor: 'gray ',
    borderRight: '1px solid black',
    padding:'2.5px',
    minWidth:'72px',
    zIndex: '1'
    };

  return (
    <div style={{height:'100%', width:'100%', border: '0px'}}>
    <div className="container" style={{ height: '100vh', width: '100vw', border: '0px' }}>
    <div className="row" style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      
      {/* Left Column */}
      <div className="col-md-3 left-column" style={leftColumnStyle}>
           <NavColumn />
      </div>
      
      {/* Conditional Rendered Components */}
      {showPage === 'update' && <Update />}
      {showPage === 'more-option' && <MoreOption />}
      {showPage === 'message' && <Message />}

      {/* Right Column */}
      <div className="col-md-9 right-column" style={{ height: '100%', width:'100%', display: 'flex', flexDirection: 'column', backgroundColor: 'blue', }}>
        
        {/* Search Row */}
        <div style={{height:'12.5%', width:'100%',  zIndex:"1", display:'flex', flexDirection:'row', border:'1px solid black', backgroundColor:'gray'}}> 
          
          <SearchDiv/>
         
        </div>
        
        {/* Page Row */}
        <div className="bottom-row" style={{ flexGrow: 1, backgroundColor: 'grey', display: 'flex', height: '90%'}}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
          </div>          
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}
export default App;


          