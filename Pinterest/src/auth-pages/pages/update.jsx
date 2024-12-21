


const Update = () => {

    const styles = {
        marginTop: '16px',
        minWidth: '360px',
        width: '392px',
        maxWidth: '407px',
        boxShadow: 'rgba(0, 0, 0, 0.1) -3px 4px 14px 0px',
        overscrollBehavior: 'none',
        top: '0px',
        left: '88px',
        height: 'calc(-32px + 100vh)',
        border: '2px solid white',
        borderRadius: '10px',
        backgroundColor: 'white',
        color: 'black',
        zIndex: '10',
    }
    return (
        <div className='update-window' style={styles}>
        <h4>Update says Hi !!</h4>
        </div>
    )
}

export default Update;