import PropTypes from 'prop-types'


const Upload = ({PinWindowVisible, SetPinWindowVisible}) => {

    Upload.propTypes = {
        PinWindowVisible: PropTypes.string,
        SetPinWindowVisible: PropTypes.func,
     }
  

    return (
     <div onClick={()=> SetPinWindowVisible(PinWindowVisible ? "" : 'upload')}>
     ↑↑
     </div>
    );
};

export default Upload;