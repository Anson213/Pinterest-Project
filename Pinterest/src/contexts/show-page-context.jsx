import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';


const PageContext = createContext();


export const ShowPageProvider = ({ children }) => {
    const [showPage, setShowPage] = useState("");


    return (
        <PageContext.Provider value={{ showPage, setShowPage }}>
            {children}
        </PageContext.Provider>
    );
};

ShowPageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export  {PageContext};