import { useRef, useState } from "react";
//btns below 
import SaveBoardBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/display-pin/save-to-board-btn.jsx'
import UploadPinBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/display-pin/upload-pin-btn.jsx'
import MoreOptionsBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/display-pin/more-options-pin.jsx'
import ImageLinkBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/display-pin/link-image-btn.jsx'
import SelectBoardPinBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/home/display-pin/select-pin-board.jsx'

const DisplayPin = ({mediaSrc, isVideo}) => {

  const mediaRef = useRef(null);
  const [PinWindowVisible, SetPinWindowVisible] = useState('')

  const handleMouseEnter = () => {
    if (isVideo && mediaRef.current) {
      mediaRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && mediaRef.current) {
      mediaRef.current.pause();
    }
  };

    return (
     <div>
      <div className='overlay-feature-div'
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
      >
     {isVideo ? (
        <video
          ref={mediaRef}
          src={mediaSrc}
          muted
          loop
        />
      ) : (
        <img
          src={mediaSrc}
          alt="Pin"
        />
      )}
        <div className='overlay-content-div'>
          <SelectBoardPinBtn  PinWindowVisible={PinWindowVisible} SetPinWindowVisible={SetPinWindowVisible}/>
          <SaveBoardBtn/>
          <MoreOptionsBtn  PinWindowVisible={PinWindowVisible} SetPinWindowVisible={SetPinWindowVisible}/>
          <UploadPinBtn  PinWindowVisible={PinWindowVisible} SetPinWindowVisible={SetPinWindowVisible}/>
          <ImageLinkBtn link={link}/>
        </div>
      </div> 
      <div className='pin-name-header'></div>
      <div className='account-display-header'></div>
     </div>
    );
};

export default DisplayPin;