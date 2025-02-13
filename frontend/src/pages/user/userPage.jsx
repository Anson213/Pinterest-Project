import './userPage.css';
import {useState} from 'react';
import Board from '../../high-order-component/user/board';
import PinCard from '../../high-order-component/home/pin-card';

//frontend\src\high-order-component\user\board.jsx


const UserPage = () => {

    const [userData, setUserData] = useState({
       name: 'name',
       imageUrl: '',
       email: 'email21@gmail.com',
       followers: '1',
       following: '1',
       boards:[1,2,3,4,5,6],
       pin:[1,2,3,4,5,6],
    });

    const [changePage, setChangePage] = useState(true);


    return (
        <div className="content"> 
            <div className='user'>
                <img className='userImage' src={userData.imageUrl} alt="image" />
                <div className='username'>{userData.name}</div>
                <p className='email'>{userData.email}</p>
                <div className='follow-status'>
                    Following {userData.followers}   Following {userData.following}
                </div>
                <div className='profile-buttons'>
                    <div className='button1'>Share</div>
                    <div className='button2'>Edit profile</div>
                    
                </div>
            </div>

            <div className='select'>
                <div className='infoButton1' onClick={() => setChangePage(false)}>Created</div>
                <div className='infoButton2' onClick={() => setChangePage(true)}>Saved</div>
            </div>

            <div className='accessibility'>
                <div className='filter'>filter</div>
                <div className='create'>create</div>
            </div>

             {changePage === true ? (
                <div className='boards'>
               { userData.boards.map((board) => (
                        <div className='board' key={board}>
                            <Board />
                        </div>
                     ))}
            </div>
             ) : (
              <div className='pins'>
                  { userData.pin.map((pin) => (
                        <div className='pin' key={pin}>
                            <PinCard />
                        </div>
                     ))}
              </div>
             )}
        </div>
    );
};

export default UserPage;

