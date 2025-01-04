
import PinCard from "./pin-card";

const ContentGrid = () => {
  const pins = [
    { id: 1, image: "img1.jpg", title: "Pin 1", description: "Description 1" },
    { id: 2, image: "img2.jpg", title: "Pin 2", description: "Description 2" },
    { id: 3, image: "img3.jpg", title: "Pin 3", description: "Description 3" },
    { id: 4, image: "img4.jpg", title: "Pin 4", description: "Description 4" },
    { id: 5, image: "img5.jpg", title: "Pin 5", description: "Description 5" },
    { id: 6, image: "img6.jpg", title: "Pin 6", description: "Description 6" },
    { id: 7, image: "img7.jpg", title: "Pin 7", description: "Description 7" },
    { id: 8, image: "img8.jpg", title: "Pin 8", description: "Description 8" },
  ];


 /* const Grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '10px', 
  padding: '16px',
  width: '100%',
  maxWidth:'1300px',
  boxSizing: 'border-box',
 }*/
  
 const Container = {
  padding:'10px 0px',
 }
 

  const Row = {
    display: 'flex',
    flexDirectiom:'column',
    justifyContent:'space-evenly',
    flexWrap: 'wrap',
    gap:'10px',   
    width: '100%',
    maxWidth:'1300px',
    minWidth:0,
    flex:1,
    boxSizing: 'border-box',
  }

  return (
    <div className="container" style={Container}>
    <div className="row g-2 flex-wrap" style={Row}>
      {pins.map((pin) => (
        <div key={pin.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
         <PinCard />
        </div>
      ))}
    </div>
  </div>
  );
};

export default ContentGrid;



/* 
    <div className="content-grid" style={Grid}>
      {pins.map((pin) => (
        <div key={pin.id} className="pin-wrapper" style={{ flexWrap:'wrap', width:'100%'}} >
          <div style={{height:'250px', width:'250px', border:'solid black 1px'}}></div>
        </div>
      ))}
    </div>
*/