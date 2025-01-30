import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';


export const authContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthed, setAuthed] = useState(false);


    return (
        <authContext.Provider value={{ isAuthed, setAuthed }}>
            {children}
        </authContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

