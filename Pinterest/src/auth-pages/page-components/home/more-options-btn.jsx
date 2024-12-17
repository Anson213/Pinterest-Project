import PropTypes  from 'prop-types'; 



const MoreOptionsBtn = ({isWindowVisible, toggleWindow}) => {

  MoreOptionsBtn.propTypes = {
    isWindowVisible: PropTypes.string,
    toggleWindow: PropTypes.func 
}

    return (
      <div onClick={()=>toggleWindow('more-options')}>

      </div>
    );
}

export default MoreOptionsBtn;