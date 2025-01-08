import PropTypes from 'prop-types';
import { usePopper } from "react-popper";
import { useState } from 'react';

const PinCard = ({ image, title, description }) => {

    PinCard.propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

    const [overlayVisible, setOverlayVisible] = useState(false);  // Initially, overlay is hidden

    const handleMouseHover = () => {
        setOverlayVisible(true);
    };

    const handleMouseLeave = () => {    
        setOverlayVisible(false);
    };

    const Pin = {
        height: '350px',
        width: '275px',
        maxWidth: '300px',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '10px', 
    };

    const ImageHousing = {
        display: 'flex', 
        height: '250px',
        width: '272.5px',
        backgroundColor: 'white',
        borderBottom: '1px solid black',  
        flexDirection: 'column',
        alignItems: 'center',  
        justifyContent: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        position:'relative',
    };

    const DetailsHousing = {
        padding: '10px',  
        height: '100px',  
        backgroundColor: 'white',
        borderTop: '1px solid black',
    };

    const OverlayContent = {
        position:'absolute',
        width: '272.5px',
        height: '250px',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',  
        color: 'white',
        borderRadius: '10px',
        
};

    return (
        <div className="pin-card" style={Pin}>
            <div 
                onMouseEnter={handleMouseHover} 
                onMouseLeave={handleMouseLeave} 
                className="pin-card-image-container" 
                style={ImageHousing}
            >
                <img src={image} alt={title} className="pin-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {overlayVisible && 
                    <div className="overlay-content-div" style={OverlayContent}>
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
                <div className="acc-details" style={{ display: 'flex', alignItems: 'center' }}>
                    <img alt="account-image" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <div>acc</div>
                </div>
            </div>
        </div>
    );
};

export default PinCard;
