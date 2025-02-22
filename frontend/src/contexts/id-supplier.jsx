import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const IdSupplierContext = createContext();

export const IdSupplierProvider = ({ children }) => {

    const [Id, setId] = useState(null);
    const [BoardId, setBoardId] = useState(null);


    return (
        <IdSupplierContext.Provider value={{ Id, setId, BoardId, setBoardId }}>
            {children}
        </IdSupplierContext.Provider>
    );

};

IdSupplierProvider.propTypes = {
    children: PropTypes.node.isRequired,
};