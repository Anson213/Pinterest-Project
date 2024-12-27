import { useContext } from 'react';
import {Routes, Route} from 'react-router-dom'
import NavColumn from './high-order-component/home/navigation-column.jsx'
import './App.css'
import { ShowPageProvider, PageContext } from './contexts/show-page-context.jsx'


function App() {
  
  const { showPage, setShowPage } = useContext(PageContext);

  return (
    <>
    <ShowPageProvider>
    <NavColumn />
    
      {showPage === 'update' && <Updates />}
      {showPage === 'more-options' && <MoreOptions />}
      {showPage === 'message' && <Messages />}

      <>
         <Routes>
            <Route path='/' element={<Home/>} />  
            <Route path='/create' element={<Create/>} />
         </Routes>
      </>
      </ShowPageProvider>
    </>
  )
}
export default App
