//@high-component, @page-component, @page
//import { useState } from 'react'
import './App.css'
//import navigationColumn from '@high-component/home/navigation-column.jsx';

import  Check1  from 'C:/Users/HP/OneDrive/Desktop/pintrest/src/auth-pages/high-order-components/home/Render-Checker.jsx'
import  Check2  from 'C:/Users/HP/OneDrive/Desktop/pintrest/src/auth-pages/page-components/home/Render-Checker.jsx'
import  Check3  from 'C:/Users/HP/OneDrive/Desktop/pintrest/src/auth-pages/pages/Render-Checker.jsx'


function App() {
  //const [isWindowVisible, toggleWindow] = useState("")

  return (
    <>
    <Check1 />
    <Check2 />
    <Check3 />
    <h2>Primary-Checker</h2>
    </>
  )
}

export default App
