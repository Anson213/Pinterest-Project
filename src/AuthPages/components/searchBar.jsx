import React, {useState} from "react";
//import '/.searchBar.css'

 const SearchBar = ({ onSearch, suggestions}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  
  return (
    <>
     <div className="search-bar"> 
      <input
      type="text"
      value={query}
      onChange={SearchInputChange}
      placeholder="Search"
      >
      </input>
     </div>
    </>
  );
}

export default SearchBar;