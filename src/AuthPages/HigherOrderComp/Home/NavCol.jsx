import React from "react";
import HomeBtn from 'src/AuthPages/PageComponents/Home/HomeBtn.jsx';
import CreateBtn from 'src/AuthPages/PageComponents/Home/CreateBtn.jsx';
import UpdateBtn from 'src/AuthPages/PageComponents/Home/UpdateBtn.jsx';
import MessageBtn from 'src/AuthPages/PageComponents/Home/MessageBtn.jsx';
import SettingsBtn from 'src/AuthPages/PageComponents/Home/SettingsBtn.jsx';

const NavCol = () => {
    return (
    <div>
    <HomeBtn />   
    <CreateBtn />
    <UpdateBtn />
    <MessageBtn />
    <SettingsBtn />
    </div>
    )
}

export default NavCol;