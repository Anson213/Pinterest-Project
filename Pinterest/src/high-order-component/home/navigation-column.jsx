import {useContext} from 'react';
import HomeImage from '../../assets/home.png';
import {PageContext} from '../../contexts/show-page-context.jsx';
//nav -> div -> 1.large button div, 2.setting div  -> button spacing div -> buttons -> button image div -> image 




const NavCol = () => {
 
    const [showPage, setShowPage] = useContext(PageContext);

    return (
       <nav id='VerticalNavContent' style={{borderRight: '1px solid black', height:'100vh', 
        width:'72px', zIndex:'700', padding:'0 0 0 0 '      }}>
        

        <div className="nav-buttons" style={{height: '100%'}}>
            <div className="divisions" style={{ gap:' 24px', height: '100%'}}>
                <div className="placeholder" style={{gap: '24px'}}>
                    <div className='button'> 
                        <div aria-label='Home'>
                          <div onClick={() => setShowPage(  showPage ? '' : 'home')}>
                              <div style={{backgroundColor: 'transparent', height:'48px', width:'48px'}}>
                                <div    style={{ fontSize: '12px', cursor:' pointer',  color: 'inherit',
                                        display: 'block', boxSizing: 'border-box', backgroundSize: 'cover',
                                        height:' 20px',  width: '20px', padding:'25px'}} >
                                    <img src={HomeImage} alt='Home' style={{height:'20px', width:'20px'}}/>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>    
            </div>
            <div className="divisions">
                <div className="placeholder"  style={{ gap:' 24px', height: '100%'}}>
                    <div className="placeholder" style={{gap: '24px'}}>
                    <div className='button'>
                        <div aria-label='Create'>
                          <div onClick={() => setShowPage(  showPage ? '' : 'create')}>
                                <div>
                                    <div></div>
                                </div>
                          </div>
                        </div>
                         </div>
                    </div>
                    </div>    
                </div>
                <div className="divisions">
                  <div className="placeholder">
                    <div className='button'>
                      <div aria-label='Notifications'>
                          <div onClick={()=> setShowPage(  showPage ? '' : 'updates')}>
                                <div></div>
                          </div>
                      </div>
                    </div>    
                </div>
                </div>
                <div className="divisions">
                <div className="placeholder">
                    <div className='button'>
                        <div aria-label='Messages'>
                          <div onClick={() => setShowPage(  showPage ? '' : 'message')}>
                                <div></div>
                          </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className="nav-settings-btn">
        <div className="divisions">
                <div className="placeholder">
                    <div>
                    <div>
                          <a>
                              <div></div>
                          </a>
                        </div>
                    </div>
                    </div>    
                </div>
        </div>
       </nav>
    )
}

export default NavCol;