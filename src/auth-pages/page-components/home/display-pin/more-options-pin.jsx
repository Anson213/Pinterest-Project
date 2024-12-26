import PropTypes from 'prop-types'


const MoreOptions = ({PinWindowVisible, SetPinWindowVisible}) => {

     MoreOptions.propTypes = {
        PinWindowVisible: PropTypes.string,
        SetPinWindowVisible: PropTypes.func,
     }
  

    return (
     <div onClick={()=> SetPinWindowVisible(PinWindowVisible ? "" : 'more-options')}>
     ...
     </div>
    );
};

export default MoreOptions;