import React from "react";
import SearchBar from 'src/AuthPages/HigherOrderComp/Home/Search.jsx';
import ContentGrid from 'src/AuthPages/HigherOrderComp/Home/ContentGrid.jsx';
import NavColumn from 'src/AuthPages/HigherOrderComp/Home/NavCol.jsx';

const HomePage = () => {
    return (
     <div>
      <SearchBar />
      <ContentGrid />
      <NavColumn />
     </div>
    );
}

export default HomePage;