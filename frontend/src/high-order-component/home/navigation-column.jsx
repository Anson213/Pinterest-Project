import {useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import HomeImage from '../../assets/home.png';
import CreateImg from '../../assets/add.png';
import UpdateImg from '../../assets/bell.png';
import MessageImg from '../../assets/messenger.png';
import SettingImg from '../../assets/setting.png';
import { PageContext } from '../../contexts/show-page-context.jsx';
//nav -> div -> 1.large button div, 2.setting div  -> button spacing div -> buttons -> button image div -> image 


const NavCol = () => {
    const {showPage, setShowPage, showWindow, setShowWindow} = useContext(PageContext);

    const Housing ={
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'gray'
    }

    const DivStyle ={
        height: '78px',
        width: '48px',
        padding:'20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'10px'
    }

    const MoreOptionDiv ={
        height: '78px',
        width: '48px',
        padding:'20px',
        marginTop: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }


    const IconStyle ={
        height: '25px',
        width: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }


      const navigate = useNavigate();


    return (
        <div className="nav-col" style={Housing}>

            <div className="nav-item" style={DivStyle}>
                <div className="nav-icon" >
                    <img src={HomeImage} alt='home' style={IconStyle} onClick= {() => navigate('/')} />
                </div>
            </div>

            <div className="nav-item" style={DivStyle}>
                <div className="nav-icon">
                    <img src={CreateImg} alt='Create' style={IconStyle} onClick= {() => navigate('/create')}/>
                </div>
            </div>

            <div className="nav-item" style={DivStyle}>
                <div className="nav-icon" onClick={() => {setShowPage(showPage ? '' : 'update'); setShowWindow(!showWindow)}}>
                    <img src={UpdateImg} alt='Updates' style={IconStyle}/>
                </div>
            </div>

            <div className="nav-item" style={DivStyle}>
                <div className="nav-icon" onClick={() => {setShowPage(showPage ? '' : 'message'); setShowWindow(!showWindow)}}>
                    <img src={MessageImg} alt='Messages' style={IconStyle}/>
                </div>
            </div>

            <div className="nav-item" style={MoreOptionDiv}>
                <div className="nav-icon" onClick={() => {setShowPage(showPage ? '' : 'more-option'); setShowWindow(!showWindow)}}>
                    <img src={SettingImg} alt='Messages' style={IconStyle}/>
                </div>
            </div>

        </div>
    );
}

export default NavCol;