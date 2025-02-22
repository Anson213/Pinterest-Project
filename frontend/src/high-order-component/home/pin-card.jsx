import PropTypes from 'prop-types';
import { useState, useContext} from 'react';
import './pin-card.css';
import { IdSupplierContext } from '../../contexts/id-supplier.jsx';
import { useNavigate } from 'react-router-dom';
//title, description, user 

const PinCard = ({ image, id}) => {
    const navigate = useNavigate();
    const {  setId } = useContext(IdSupplierContext);

    const handlePinClick = (e) => {
        const pinId = e.target.id; // Extract the id of the clicked element
        setId(pinId); // Set the id to the context
        navigate(`/pin/${pinId}`); // Navigate to the pin page
        };

    PinCard.propTypes = {
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        user: PropTypes.object.isRequired,
    };

    const [overlayVisible, setOverlayVisible] = useState(false);

    return (
        <div id={id}
            className="pin-card" 
            onMouseEnter={() => setOverlayVisible(true)} 
            onMouseLeave={() => setOverlayVisible(false)}
        >
            <img src={image} alt="Pin" className="pin-card-image" />

            {overlayVisible && (
                <div className="overlay-content-div" id={id} onClick={handlePinClick}>
                    <button className="overlay-button">Save</button>
                    <button className="overlay-button">Upload</button>
                    <button className="overlay-button">Share</button>
                    <button className="overlay-button">Link</button>
                    <button className="overlay-button">Board</button>
                </div>
            )}
        </div>
    );
};

export default PinCard;
