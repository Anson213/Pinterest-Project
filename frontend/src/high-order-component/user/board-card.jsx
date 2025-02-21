import './board-card.css';

const Board = () => {
    return (
        <div className='board'>
            <div className='image-grid'>
                <div className="g1"></div>
            <div className="image-grid2">
               <div className="g2"></div>
               <div className="g3"></div>
            </div>               
            </div>
            <div className="name">Name</div>
        </div>
    );
};

export default Board;
