import PropTypes from 'prop-types';


const NewPinBtn = ({CreatePinLook}) => {  
    
    NewPinBtn.propTypes = {
        CreatePinLook: PropTypes.bool,
    }

    return (
        <div className="new-pin-btn">
            {                   
            CreatePinLook === false ? 
            <button>+</button> : 
            <button>Create New Pin </button>
            }
        </div>
    )
}

export default NewPinBtn;