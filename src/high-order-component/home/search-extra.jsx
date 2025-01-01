import React from 'react';
import MagIcon from '../../assets/search.png'

const SearchExtra = () => {

    const valTest = '';
    const isValidTag = true;


    const Container = {
        zIndex:'10', height: '200%', width: '90%',  marginTop: '0.4px',
         display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'white', 
    };
    
    const Row = {
        height: '50%', width: '96%', border: 'solid 1px black', margin: '12.5px',
        display: 'flex', flexDirection: 'row', alignItems: 'center'
    };
    
    const Column = {
        width: '70%', height: '100%', border: 'solid 1px white', display: 'flex',
        flexDirection: 'column', alignItems: 'center'
    };
    
    const InColRow1 = {
        height: '100%', width: '100%', border: '1px solid black', display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center'
    };
    
    const Input = {
        color:'black', margin: '15px', width: '85%', height: '37.5px', backgroundColor: 'white',
        border: '1px solid black', outline: 'none', paddingLeft: '30px',  
    };
    
    const InputCover = {
        border: '1px solid black', height: '60%', width: '90%', display: 'flex',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
        minHeight: '40px', position: 'relative', margin: '10px'
    };
    
    const IconWrapper = {
        position: 'absolute', left: '10px', display: 'flex', alignItems: 'center', margin:'15px'
    };

    
    
    return (
        <div className="container-fluid" style={Container} >

            <div className="row" style={Row} >

                <div className="col" style={Column} >

                    <div className="row" style={InColRow1}>

                        <div style={InputCover}  >
                            <div style={IconWrapper} >
                                <img src={MagIcon} style={{ height: '18px', width: '18px' }} />
                            </div>
                            <input style={Input} placeholder='...Enter Tags' value={valTest} onClick={() => console.log('clicked')} />
                            
                        <div>
                        {isValidTag ? (
                        <span style={{ color: "green", fontSize: "16px" }}>✔️</span>
                    ) : (
                        <span style={{ color: "red", fontSize: "16px" }}>❌</span>
                    )}
                        </div>
                        </div> 
                        
                    </div>
                </div>
    
                <div className="col" style={Column}>

                    <div className="row" style={InColRow1}>

                        <div style={InputCover}>
                            <div style={IconWrapper}>
                                <img src={MagIcon} style={{ height: '18px', width: '18px' }} />
                            </div>
                            <input style={Input} placeholder='...Enter Date' />
                            
                        <div>
                        {isValidTag ? (
                        <span style={{ color: "green", fontSize: "16px" }}>✔️</span>
                    ) : (
                        <span style={{ color: "red", fontSize: "16px" }}>❌</span>
                    )}
                        </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchExtra;