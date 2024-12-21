import CreateBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/create-btn.jsx'
import HomeBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/home-btn.jsx'
import UpdateBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/update-btn.jsx'
import MessageBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/message-btn.jsx'
import MoreOptionsBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/more-options-btn.jsx'
import PropTypes from 'prop-types'



const navigationColumn = ({isWindowVisible, toggleWindow}) => {

    const styles = {
       color:'black',
       backgroundColor: 'white',
       padding: '0 -200px',
       height:'100vh',
       width: '72px',
       borderRight: '1px solid black',
    }

    navigationColumn.propTypes = {
        setActiveTab: PropTypes.func,  
        activeTab: PropTypes.string, 
      };

    return (
        <div style={styles}>
        <HomeBtn />
        <CreateBtn />
        <UpdateBtn isWindowVisible={isWindowVisible} toggleWindow={toggleWindow}/>
        <MessageBtn isWindowVisible={isWindowVisible} toggleWindow={toggleWindow}/> 
        <MoreOptionsBtn isWindowVisible={isWindowVisible} toggleWindow={toggleWindow}/>
        </div>
    )
}


export default navigationColumn;