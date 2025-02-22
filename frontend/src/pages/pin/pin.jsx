import './pin.css';
//import { useParams } from "react-router-dom";

const Pin = () => {
   // const { pinId } = useParams();
    return (
        <div className='pin-container'>
            <div className='pin-content'>
                <div className="image-pin"></div>
                <div className="input-data">
                    <div className="interactions">
                        <div className="like-btn">like-icon</div>
                        <div className="like-counter">like counter</div>
                        <div className="board-select">board select</div>
                        <div className="save-btn">save-btn</div>
                    </div>
                    <div className="account">
                        <div className="account-img">acc-img</div>
                        <div className="account-btn">acc-name</div>
                    </div>
                    <div className="comments">
                    <div className="comments-btn-container">
                        <div className="comment-btn">comment</div>
                    </div>
                    <div className="comment-display">comment display</div>
                    </div>
                    <div className="commenting-btn">comment here</div>
                </div>
            </div>
            <div className='extra-pin-grid'></div>
        </div>
    );
};

export default Pin;