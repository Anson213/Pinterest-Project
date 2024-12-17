import PropTypes  from 'prop-types'; 



const UpdateBtn = ({isWindowVisible, toggleWindow}) => {
 
  UpdateBtn.propTypes = {
    isWindowVisible: PropTypes.string,
    toggleWindow: PropTypes.func 
}
    return (
      <div onClick={()=>toggleWindow('update')}>

      </div>
    );
}

export default UpdateBtn;