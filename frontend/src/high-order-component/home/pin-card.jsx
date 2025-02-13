import PropTypes from 'prop-types';
import { useState } from 'react';
import './pin-card.css';

const PinCard = ({ image }) => {

    PinCard.propTypes = {
        image: PropTypes.string.isRequired,
    };

    const [overlayVisible, setOverlayVisible] = useState(false);

    return (
        <div 
            className="pin-card" 
            onMouseEnter={() => setOverlayVisible(true)} 
            onMouseLeave={() => setOverlayVisible(false)}
        >
            <img src={image} alt="Pin" className="pin-card-image" />

            {overlayVisible && (
                <div className="overlay-content-div">
                    <button className="overlay-button">Save</button>
                    <button className="overlay-button">Upload</button>
                    <button className="overlay-button">Share</button>
                    <button className="overlay-button">Link</button>
                </div>
            )}
        </div>
    );
};

export default PinCard;
