import { useState } from 'react';



const Create = () => {

    const Base = {
        container: {height: '100vh', width: '100%', display:'flex',},
        row: {display: 'flex', flex:'1', justifyContent: 'space-between', height:'100%', width:'100%',}
    };

    const Columns = {
        left: {display:'flex', flexDirection:'column', height:'100%', width: '90%',
               border:'1px black solid' 
            },
        right: {minHeight: '100%', width:'10%', border: '1px solid white',}
    };

    const Right = {
        expanded: { backgroundColor: 'lightgray',},
        contracted: { backgroundColor: 'lightblue',}
    }

    const Left = {
        header: { border:'1px solid black', height:'12.5%'},
        fileInput: { position:'relative', height:'100px', width:'100px', border:'1px solid black', margin:'20px 0px'},
        inputs: { 
            border:'1px solid white',
            height:'calc(100% - 400px)',
            flex:'1',
            overflow: 'auto',        
            overflowX: 'hidden',     
            overflowY: 'auto',
            paddingLeft:'160px',
            paddingBottom:'80px',
         }
    }

    const Inputs = {
        wrapper: {marginBottom:'10px', display:'flex', flexDirection:'column', gap:'2.5px', height:'20% '},
        labels: {marginLeft:'-5px', fontSize:'0.92rem'  },
        title: {height:'100%', width:'80%'},
        description: {height:'100%', width:'80%'},
        link: {height:'100%', width:'80%'},
        board: {height:'100%', width:'80%'},
        tag: {height:'100%', width:'80%'}
    }

    const [isDraftVisible, setDraftVisibility] = useState(false);

    const [formData, setFormData] = useState({
        media: '',
        title: '',
        description: '',
        link: '',
        board: '',
        tag: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className='container-fluid p-0' style={Base.container}>
            <div className='row mx-0' style={Base.row}>

                    <div className='inputs-div' style={Left.inputs}>

                    <div className='input-header-container col-md-9 p-0' style={Columns.left}>

                        <div className='header-div' style={Left.header}>
                             <h3>Create Pin</h3>
                        </div>
                         
                        <div className='file-input-housing' style={Left.fileInput}>
                             <input
                                 accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp,video/mp4,video/x-m4v,video/quicktime"
                                 type="file"
                                 style={{
                                     cursor: "pointer",
                                     height: "30px",
                                     opacity: 1,
                                     border:'1px solid black',
                                     position: "absolute",
                                     width: "100%",
                                   }}
                                   multiple
                                   tabIndex="0"
                                   value={formData.media}
                                   onChange={handleInputChange}
                             />
                       </div>

                    {['title', 'description', 'link', 'board', 'tag'].map((field) => (
                        <div className="input" key={field} style={Inputs.wrapper}>
                            <label htmlFor={field} style={Inputs.labels}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                style={Inputs[field]}
                                type="text"
                                id={field}
                                placeholder={`Add a ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                value={formData[field]}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                    </div>
                </div>

              
                <div className='draft-col-container col-md-3 p-0' style={Columns.right}>
                    {isDraftVisible ? (
                        <div className='expanded-div' style={Right.expanded}>Expanded</div>
                    ) : (
                        <div className="contracted-div" style={Right.contracted}>Contracted</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Create;