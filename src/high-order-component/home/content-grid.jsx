
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


 const Grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '16px', /* Space between grid items */
  padding: '16px', /* Optional padding around the grid */
  width: '100%',
  boxSizing: 'border-box',
 }

  return (
    <div className="content-grid" style={Grid}>
      {pins.map((pin) => (
        <div key={pin.id} className="pin-wrapper" style={{display:'flex', flexWrap:'2'}} >
          <div style={{height:'250px', width:'250px', border:'solid black 1px'}}></div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
