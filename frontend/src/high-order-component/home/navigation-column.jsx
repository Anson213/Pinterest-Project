import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeImage from '../../assets/home.png';
import CreateImg from '../../assets/add.png';
import UpdateImg from '../../assets/bell.png';
import MessageImg from '../../assets/messenger.png';
import SettingImg from '../../assets/setting.png';
import { PageContext } from '../../contexts/show-page-context.jsx';
import './navigation-column.css'; // Import the CSS file

const NavCol = () => {
    const { showPage, setShowPage, showWindow, setShowWindow } = useContext(PageContext);
    const navigate = useNavigate();

    return (
        <div className="nav-col">
            <div className="nav-item">
                <div className="nav-icon">
                    <img src={HomeImage} alt="home" onClick={() => navigate('/')} />
                </div>
            </div>

            <div className="nav-item">
                <div className="nav-icon">
                    <img src={CreateImg} alt="Create" onClick={() => navigate('/create')} />
                </div>
            </div>

            <div className="nav-item">
                <div className="nav-icon" onClick={() => { setShowPage(showPage ? '' : 'update'); setShowWindow(!showWindow); }}>
                    <img src={UpdateImg} alt="Updates" />
                </div>
            </div>

            <div className="nav-item">
                <div className="nav-icon" onClick={() => { setShowPage(showPage ? '' : 'message'); setShowWindow(!showWindow); }}>
                    <img src={MessageImg} alt="Messages" />
                </div>
            </div>

            <div className="nav-item more-option">
                <div className="nav-icon" onClick={() => { setShowPage(showPage ? '' : 'more-option'); setShowWindow(!showWindow); }}>
                    <img src={SettingImg} alt="Settings" />
                </div>
            </div>
        </div>
    );
};

export default NavCol;