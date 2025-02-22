import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IdSupplierContext } from '../../contexts/id-supplier.jsx';
import './board-card.css';
import PropTypes from 'prop-types';


const Board = ({id, pin, name}) => {
    const navigate = useNavigate();
    const { setBoardId } = useContext(IdSupplierContext);
   
    const url1 = pin?.[0]?.image || ''; // "Peak production code" ~Primeregan
    const url2 = pin?.[1]?.image || '';
    const url3 = pin?.[2]?.image || '';

    const clickHandle = (e) => {
        const boardId = e.target.id;
        setBoardId(boardId);
        navigate(`/board/${boardId}`);
        
    }
    return (
        <div className='board' onClick={clickHandle} id={id}>
            <div className='image-grid'>
                <div className="g1" id={id}>
                    <img src={url1} alt='1' />
                </div>
            <div className="image-grid2" id={id}>
               <div className="g2">
                     <img src={url2} alt='2' />
               </div>
               <div className="g3">
                        <img src={url3} alt='3' />
               </div>
            </div>               
            </div>
            <div className="name" id={id}>
                <h4>{name}</h4>
            </div>
        </div>
    );
};
Board.propTypes = {
    id: PropTypes.string.isRequired,
    pin: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string
        })
    ).isRequired,
    name: PropTypes.string.isRequired
};

export default Board;
