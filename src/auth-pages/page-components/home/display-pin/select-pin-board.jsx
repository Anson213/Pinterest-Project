import PropTypes from 'prop-types'

//different boards need to be rendered in the save Div. Use get/fetch.


const SelectBoard = ({PinWindowVisible, SetPinWindowVisible}) => {

     SelectBoard.propTypes = {
        PinWindowVisible: PropTypes.string,
        SetPinWindowVisible: PropTypes.func,
     }
  

    return (
     <div onClick={()=> SetPinWindowVisible(PinWindowVisible ? "" : 'select-pin-board')}>
     Boards ˅
     </div>
    );
};

export default SelectBoard;