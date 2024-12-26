import PropTypes from 'prop-types';


const NewPinBtn = ({CreatePinLook, clearFields }) => {  
    
    NewPinBtn.propTypes = {
        CreatePinLook: PropTypes.bool,
        clearFields: PropTypes.func
    }

    return (
        <div className="new-pin-btn">
            {                   
            CreatePinLook === false ? 
            <div onClick={clearFields}>+</div> : 
            <div onClick={clearFields}>Create New Pin </div>
            }
        </div>
    )
}

export default NewPinBtn;