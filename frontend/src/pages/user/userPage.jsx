import './userPage.css';


const UserPage = () => {
    return (
        <div className="content"> 
            <div className='user'>
                <img className='userImage' src="" alt="image" />
                <div className='username'>Username</div>
                <p className='email'>email21@gmail.com</p>
                <div className='follow-status'>
                    Followers 0    Following 0
                </div>
                <div className='profile-buttons'>
                    <div className='button1'>Share</div>
                    <div className='button2'>Edit profile</div>
                    
                </div>
            </div>

            <div className='select'>
                <div className='infoButton1'>Created</div>
                <div className='infoButton2'>Saved</div>
            </div>

            <div className='accessibility'>
                <div className='filter'>filter</div>
                <div className='create'>create</div>
            </div>

            <div className='boards'>
                show board
            </div>
        </div>
    );
};

export default UserPage;