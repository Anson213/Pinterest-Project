import { useState } from 'react';



const Create = () => {

    const Base =  {
        container:{height: '100vh', width: '100%', display:'flex'},
        row:{display: 'flex', justifyContent: 'space-between', height:'100%', width:'100%'},
    }

    const Column = {
        left:{flex:'1', display:'flex', flexDirection:'column', height:'100%', width: '90%',
             overflowY: 'auto', paddingBottom:'120px' },
        right:{height: '100%', width:'10%', border: '1px solid white'},
    }

    const ColumnLeft = {
        header:{display:'flex', borderBottom:'1px solid black', height:'15%',flexShrink: 0,
            h3:{padding:'5px 0px 2px 10px'},
        },
        input: {  width:'100%', marginBottom:'480px', height:'100%',
            file:{position:'relative', height:'400px', width:'30%',
                 border:'1px solid black', margin:'25px 45px',
            },
            text:{border:'1px solid black', width:'60%', margin:'-425px 0px 0px 425px', padding:'0px 10px 80px 10px' },
            wrapper:{padding:'10px', display:'flex', flexDirection:'column',
                 height:'10%', width:'100%', margin:'10px 0px'
             },
            label:{fontSize:'0.92rem', padding:'2.5px'},
            title:{},
            description:{},
            link:{},
            board:{},
            tag:{},
        },
    }

    const ColumnRight = {
        contracted:{},
        expanded:{},
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
         
        <div className="container-fluid" style={Base.container}>

            <div className="row" style={Base.row}>

                <div className="header-input column col-md-9" style={Column.left}>

                     <div className='header' style={ColumnLeft.header}>
                        <h3 style={ColumnLeft.header.h3}>Create Pin</h3>
                     </div>

                     <div className='input-div' style={ColumnLeft.input}>
                        <div className="file-input" style={ColumnLeft.input.file}>
                             <input
                                 accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp,video/mp4,video/x-m4v,video/quicktime"
                                 type="file"
                                 style={{
                                     cursor: "pointer",
                                     height: "100%",
                                     opacity: 1,
                                     position: "absolute",
                                     width: "100%",
                                   }}
                                   multiple
                                   tabIndex="0"
                                   value={formData.media}
                                   onChange={handleInputChange}
                               />
                             </div>

                             <div style={ColumnLeft.input.text}> 
                      
                             {['title', 'description', 'link', 'board', 'tag'].map((field) => (
                                 <div className="input" key={field} style={ColumnLeft.input.wrapper}>
                                  <label htmlFor={field} style={ColumnLeft.input.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                  <input
                                    style={ColumnLeft.input[field]}
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

                </div>

                <div className="draft-column col-md-3" style={Column.right}> 
                {isDraftVisible ? (
                        <div className='expanded-div' style={ColumnRight.expanded}>Expanded</div>
                    ) : (
                        <div className="contracted-div" style={ColumnRight.contracted}>Contracted</div>
                    )}
                </div>

                </div>

        </div>

    );
};

export default Create;


/*
    const Base = {
        container: {height: '100vh', width: '100%', display:'flex',},
        row: {display: 'flex', justifyContent: 'space-between', height:'100%', width:'100%',}
    };

    const Columns = {
        left: {display:'flex', flexDirection:'column', height:'100%', width: '90%',
               border:'1px black solid', 
            },
        right: {minHeight: '100%', width:'10%', border: '1px solid white', }
    };

    const Right = {
        expanded: { backgroundColor: 'lightgray',},
        contracted: { backgroundColor: 'lightblue',}
    }

    const Left = {
        header: { border:'1px solid black', height:'12.5%'},
        fileInput: { position:'relative', height:'100px', width:'100px', border:'1px solid black', margin:'20px 0px'},
        inputs: {
            width:'100%',
            overflowY: 'auto',
            border: '1px solid white',
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
*/