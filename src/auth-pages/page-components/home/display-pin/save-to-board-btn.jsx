import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const PinCard = ({ pin }) => {
  const [isSaved, setIsSaved] = useState(false);

  PinCard.propTypes = {
    pin: PropTypes.object
  }

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/savePin', { pinId: pin._id });
      if (response.status === 200) {
        setIsSaved(true); // Mark as saved
      }
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  };

  return (
    <div className="pin-card">
      <img src={pin.imageUrl} alt={pin.title} />
      <h3>{pin.title}</h3>
      <button onClick={handleSave} disabled={isSaved}>
        {isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default PinCard;
