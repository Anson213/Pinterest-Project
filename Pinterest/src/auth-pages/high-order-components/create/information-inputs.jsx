import { useState, useEffect } from "react";
import PublishBtn from 'C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/create/publish-btn.jsx'


//The tag input is actually a search bar with an on command result space.
//Same goes for the board input.

const Inputs = () => {

    const [formData, setFormData] = useState({
        media:"",
        title: "",
        description: "",
        link: "",
        board: "",
        tag:"",
    })

    const handlePublish = async () => {
        try {
          const response = await fetch('/api/pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Pin published successfully!');
            setFormData({
              title: '',
              description: '',
              board: '',
              tags: [],
              image: null,
            }); // Clear fields after success
          } else {
            console.log('Failed to publish pin');
          }
        } catch (error) {
          console.error('Error while publishing pin:', error);
        }
      };

    useEffect(() => {
        // Example fetch request to the backend
        fetch("https://api.example.com/getPinData")
          .then((response) => response.json())
          .then((data) => {
            // Set the fetched data into the state
            setFormData({
                image: data.image,
                title: data.title,
                description: data.description,
                link: data.link,
                board: data.board,  
                tag: data.tag,                
            });
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
      <div>
        <div className="header">
            <h1>Create Pin</h1>
            <PublishBtn handlePublish={handlePublish}/>
        </div>
        <div className="inputs">
                <div className="input-files">
                   <div className="Input-picture"></div>
                    <div className="First-text">Choose a file or drag and drop it here.</div>
                    <div className="Data-text">
                      We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.
                    </div>
                  <input 
                    accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp,video/mp4,video/x-m4v,video/quicktime"
                    type="file"
                    style="cursor: pointer; height: 100%; opacity: 0; position: absolute; width: 100%; left: 0px; top: 0px; font-size: 0px;"
                    multiple="" tabIndex="0"
                    value={formData.media} onChange={handleInputChange} />
               </div>
                <div className="input">
                   <label htmlFor="title">Title</label>
                   <input type="text" id="title" placeholder="Add a Title" value={formData.title} onChange={handleInputChange}/>
               </div>
               <div className="input">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" placeholder="Add a detailed Description" 
                    value={formData.description} onChange={handleInputChange}/>
               </div>
                <div className="input">
                    <label htmlFor="link">Link</label>
                    <input type="text" id="link" placeholder="Add a Link" value={formData.link} 
                    onChange={handleInputChange}/>
                </div>
               <div className="input">
                   <label htmlFor="board">Board</label>
                   <input type="text" id="board" placeholder="board" value={formData.board} 
                   onChange={handleInputChange}/>
               </div>
               <div className="input">
                   <label htmlFor="tag-topic">Tag</label>
                    <input type="text" id="tag-topic" placeholder="Select or make Tag" 
                    value={formData.tag} onChange={handleInputChange}/>
               </div>
        </div>
     </div>
    )
}

export default Inputs;