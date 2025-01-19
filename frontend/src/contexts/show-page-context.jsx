import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';


export const PageContext = createContext();


export const ShowPageProvider = ({ children }) => {
    const [showPage, setShowPage] = useState("");
    const [showWindow, setShowWindow] = useState(false)


    return (
        <PageContext.Provider value={{ showPage, setShowPage, showWindow, setShowWindow }}>
            {children}
        </PageContext.Provider>
    );
};

ShowPageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

