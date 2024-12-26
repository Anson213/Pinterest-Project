import PropTypes from 'prop-types'


const ExpandContract = ({Visibility, setVisibility, CreatePinLook, setCreatePinBtnLook, fetchDraft}) => {

    ExpandContract.propTypes = {
        Visibility: PropTypes.bool,
        setVisibility: PropTypes.func,
        CreatePinLook: PropTypes.bool,
        setCreatePinBtnLook: PropTypes.func,
        fetchDraft: PropTypes.func,
    }

    const Stater = () => {
        setVisibility(!Visibility)
        setCreatePinBtnLook(!CreatePinLook)
        fetchDraft()
    }

    return (
        <div className="expand-contract">
                <button onClick={() => Stater()} >
                  {Visibility === false ? ">>" : "<<"}
                </button>
        </div>
    )
}

export default ExpandContract;  