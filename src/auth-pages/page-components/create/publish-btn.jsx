import PropTypes from 'prop-types';


const PublishBtn = ({ handlePublish }) => {

   PublishBtn.propTypes = {
         handlePublish: PropTypes.func
   }

    return (
        <div className="publish-btn">
            <button onClick={handlePublish}>Publish</button>
        </div>
    )
}

export default PublishBtn;