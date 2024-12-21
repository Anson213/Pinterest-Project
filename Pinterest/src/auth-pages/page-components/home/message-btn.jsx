import PropTypes  from 'prop-types'; 



const MessageBtn = ({isWindowVisible, toggleWindow}) => {

  MessageBtn.propTypes = {
    isWindowVisible: PropTypes.string,
    toggleWindow: PropTypes.func 
}

    return (
      <div onClick={()=>toggleWindow(isWindowVisible ? '' :'message')}>
       Message
      </div>
    );
}

export default MessageBtn;