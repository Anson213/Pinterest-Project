import PropTypes from 'prop-types';
import { useState } from 'react';

const PinCard = ({ image, title, description }) => {

    PinCard.propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

     const [overlayVisible, setOverlayVisible] = useState(true);

    const handleMouseHover = () => {
        setOverlayVisible(false);
    };

    const handleMouseLeave = () => {    
        setOverlayVisible(true);
    }
   
    const Pin = {
      height:'auto',
      width:'100%',
      maxWidth:'300px',
      backgroundColor:'white',
      margin:'5px',
      border:'1px solid black',
      borderRadius:'10px',
    }

    const ImageHousing = {
        display:'flex', 
        height:'250px',
        width:'100%',
        backgroundColor:'white',
        border:'1px solid black',
        flexDirection:'column',
        alignSelf:'center',
        justifySelf:'center',
        borderRadius:'10px',
    }

    const DetailsHousing = {
        border:'1px solid black',  
        height:'10%',
        width:'100%',
        backgroundColor:'white',
    }

    return (
        <div className="pin-card" style={Pin}>
            <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave} className="pin-card-image-container" style={ImageHousing}>
            <img src={image} alt='image' className="pin-card-image" />

           {overlayVisible ? null : 
              <div className='overlay-content-div'>
              <div>Board</div>
              <div>Save</div>
              <div>Upload</div>
              <div>Share</div>
              <div>Link</div>
            </div>
           }
            </div>
            <div className="pin-card-content" style={DetailsHousing}>
                <div>{title}</div>
                <div className='acc-details'>
                     <img alt='account-image'/>
                     <div>acc</div>
                </div>
            </div>
        </div>
    );
};

export default PinCard;