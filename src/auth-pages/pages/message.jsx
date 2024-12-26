


const Message = () => {

    const styles = {
        padding: '20%',
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

        <div style={styles}>
        <h1>Message says Hi !!</h1>
        </div>
    )
}

export default Message;