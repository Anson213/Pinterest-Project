import './userPage.css';
import {useState} from 'react';
//import Board from '../../high-order-component/user/board-card';
//import PinCard from '../../high-order-component/home/pin-card';
import BoardGrid from './board-grid';
import PinGrid from './user-pin-grid';

const UserPage = () => {

    //API call to get user data. 

    const [userData, setUserData] = useState({
       name: 'name',
       imageUrl: '',
       email: 'email21@gmail.com',
       followers: '1',
       following: '1',
       boards:[
        {
            id: 1,
            pin: [
                { id: 1, image: "img1.jpg", title: "Pin 1", description: "Description 1" },
                { id: 2, image: "img2.jpg", title: "Pin 2", description: "Description 2" },
                { id: 3, image: "img3.jpg", title: "Pin 3", description: "Description 3" },
            ],
            name: 'board1',
        },
        {
            id: 2,
            pin: [
                { id: 1, image: "img1.jpg", title: "Pin 1", description: "Description 1" },
                { id: 2, image: "img2.jpg", title: "Pin 2", description: "Description 2" },
                { id: 3, image: "img3.jpg", title: "Pin 3", description: "Description 3" },
            ],
            name: 'board2',
        }, ],
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
                    <BoardGrid items={userData.boards} />
                </div>
             ) : (
              <div className='pins'>
                  <PinGrid items={userData.pin} />
              </div>
             )}
        </div>
    );
};

export default UserPage;