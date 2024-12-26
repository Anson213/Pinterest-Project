import PropTypes from 'prop-types';
import {useState} from 'react'



const DraftPinCard = ({draftData}) => { 

    const [draftOptionVsibility, setDraftOptionVisibility] = useState(false)

    DraftPinCard.propTypes = {
        draftData: PropTypes.object
    }

    return (
        <div className="draft-pin-card">
            <div>
                <img src={draftData.image} alt="draft-pin"/>
            </div>
            <div>
                <h3>{draftData.title}</h3>
            </div>
            <div onClick={()=> setDraftOptionVisibility(!draftOptionVsibility)}>...</div>
            <MoreOptionPage/>
        </div>
    )
}


const MoreOptionPage = () => {
    return (
        <div className="more-option-page">
            <div>
                <h3>Duplicate</h3>
            </div>
            <div>
                <h3>Delete</h3>
            </div>
        </div>
    )
}   


export default DraftPinCard;