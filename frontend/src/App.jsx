import { useContext, useState } from 'react';
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
import SignIn from './pages/sign-in_log-in/sign-in.jsx'
import User from './pages/user/userPage.jsx'
import Pin from './pages/pin/pin.jsx'


function App() {
  const { showPage, showWindow } = useContext(PageContext);
  const [isLoggedIn, setLogIn] = useState(true)
  

  
  return (
    isLoggedIn === true ?  (
    <div className='container' >
    {/* Left Column */}
    <div className='left-column' >
      <NavColumn />
    
      { showWindow === true ?
      <div className='window-housing'>  
      {showPage === 'update' && <Update />}
      {showPage === 'more-option' && <MoreOption />}
      {showPage === 'message' && <Message />}
      </div>
       : null }
      
    </div>

    {/* Main Content */}
    <div  className='right-column'>
      {/* Search Row */}
      <div  className='search-div' >
        <SearchDiv />
      </div>

      {/* Page Content */}
      <div  className='bottom-row' >
        <div className='page-wrapper'  >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path='/user/' element={<User/>} />
            <Route path='/pin/' element={<Pin/>} />
          </Routes>
        </div>
      </div>

      {/* Conditional Components */}
      
    </div>
  </div>)  : 
  (
    <SignIn />
  )
  );
};

export default App;


          