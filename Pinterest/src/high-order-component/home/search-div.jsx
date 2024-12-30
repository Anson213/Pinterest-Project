import { useState } from 'react';
import SearchImg from '../../assets/search.png'


const SearchDiv = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const query = '';

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search submit logic here and put it in a useEffect hook to use enter key
        console.log('Search Term:', searchTerm);
    };



     const Container = {
       height:'100%', width:'100%', marginLeft:'10px', marginRight:'10px'
     }
     const Row = {
        width: '100%', display: 'flex', justifyContent: 'space-between', marginTop:'10px'
     }
      const InputBox = {
        backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center', 
        height: '55px', width:'90%', minWidth:'40px', borderRadius:''
      }
      const AccountBox = {
        backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center', 
        height: '50px', border: '1px solid black', width:'3.5%', minWidth: '48px', marginTop:'2.5px'
      }
      const AccOption = {
        backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center', 
        height: '30px', border: '1px solid black', width:'2.5%', minWidth:'24px', marginTop:'15px'
      }
      const InputDiv = {
        display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'white',
        height:'100%', width:'100%', borderRadius:'15px'
      }
      const IconDiv = {
        display:'flex', padddingRight:'0px', marginRight:'5px'
      }
      const Input = {
        height:'100%', width:'92.5%', backgroundColor: 'white', border:'0px', color:'black',
        outline:'none'
      }

    return (
        <div className='container-fluid' style={Container}>  

<div className="row" style={Row}>
      
      <div className="col-md-4" style={InputBox}>
        <div style={ InputDiv }>
            <div style={IconDiv}>
               <img src={SearchImg} alt='magnification glass' style={{height:'24px', width:'24px'}}/>
            </div>
            <input type="text" value={query} onChange={handleInputChange} placeholder="Search..."style={Input}/>
        </div>
      </div>

      <div className="col-md-4" style={AccountBox}>
        Box 2
      </div>

      <div className="col-md-4" style={AccOption}>
        Box 3
      </div>

    </div>

</div>

    );
};

export default SearchDiv;