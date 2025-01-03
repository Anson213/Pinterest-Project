import { createContext, useState} from 'react';
import PropTypes from 'prop-types';


export const OpenCloseBarsContext = createContext();


export const OpenCloseBarsProvider = ({ children }) => {
    const [isSubSearchBarClosed, setIsSubSearchBarOpen] = useState(true);

    const toggleSubSearchBar = () => {
        setIsSubSearchBarOpen(!isSubSearchBarClosed);
    };

    return (
        <OpenCloseBarsContext.Provider value={{ isSubSearchBarClosed, toggleSubSearchBar }}>
            {children}
        </OpenCloseBarsContext.Provider>
    );
};

OpenCloseBarsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
