import React from "react";
import Expand_ContractBtn from 'src/AuthPages/PageComponents/Create/Expand_ContactBtn.jsx';
import NewPinBtn from 'src/AuthPages/PageComponents/Create/NewPinBtn.jsx'
import DraftPin from 'src/AuthPages/PageComponents/Create/DraftPin.jsx'

const DraftCol =() => {

//There will be 2 states 1 minimised and 1 maximised, Each will be differnt with 2nd one having a draftPin display

  return (
    <div>
    <Expand_ContractBtn />
    <NewPinBtn />
    <DraftPin />
    </div>
  );
};

export default DraftCol;