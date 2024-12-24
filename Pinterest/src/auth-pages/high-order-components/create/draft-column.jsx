import ExpandContract from "C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/create/expand-contract-btn.jsx"
import DraftCard from "C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/create/draft-pin-card.jsx"
import NewPin from "C:/Users/HP/OneDrive/Desktop/Pinterest/Pinterest/src/auth-pages/page-components/create/new-pin-btn.jsx"
import { useState } from "react"
import axios from 'axios'

const DraftColumn = () => { 

 const [Visibility, setVisibility] = useState(false)
 const [CreatePinLook, setCreatePinBtnLook] = useState(false)
 const [draftData, setDraftData] = useState([]);


 const fetchDrafts = async () => {
    try {
      const response = await axios.get('/api/drafts');
      setDraftData(response.data); 
    } catch (error) {
      console.error('Error fetching drafts:', error);
    }
  };

    return (
        <div className="draft-column">
            {Visibility === false && <div className="minimised">
               <div >
                  <ExpandContract Visibility={Visibility} setVisibility={setVisibility} fetchDrafts={fetchDrafts}/>
                  <NewPin CreatePinLook={CreatePinLook} setCreatePinBtnLook={setCreatePinBtnLook}/>
                </div>
                <div>
                  Divider 
                </div>
            </div>}

           {Visibility === true && <div className="maximised">
                <div>
                     Pin Drafts {DraftCount}
                </div>     
                <div><NewPin/></div>     
                <div>
                   {draftData.map((draft) => (
                       <DraftCard 
                             key={draft.id} 
                             title={draft.title} 
                             image={draft.image}
                        />
                    ))}
                 </div>
            </div>}
        </div>
    )
}

export default DraftColumn;