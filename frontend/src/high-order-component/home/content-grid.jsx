//import PinCard from "./pin-card";
import PinGrid from "./pin-grid";

const ContentGrid = () => {

  //add the API call for pins of said user.
  const items = [
    { id: 1, image: "img1.jpg", title: "Pin 1", description: "Description 1" },
    { id: 2, image: "img2.jpg", title: "Pin 2", description: "Description 2" },
    { id: 3, image: "img3.jpg", title: "Pin 3", description: "Description 3" },
    { id: 4, image: "img4.jpg", title: "Pin 4", description: "Description 4" },
    { id: 5, image: "img5.jpg", title: "Pin 5", description: "Description 5" },
    { id: 6, image: "img6.jpg", title: "Pin 6", description: "Description 6" },
    { id: 7, image: "img7.jpg", title: "Pin 7", description: "Description 7" },
    { id: 8, image: "img8.jpg", title: "Pin 8", description: "Description 8" },
    { id: 9, image: "img1.jpg", title: "Pin 1", description: "Description 1" },
    { id: 10, image: "img2.jpg", title: "Pin 2", description: "Description 2" },
    { id: 11, image: "img3.jpg", title: "Pin 3", description: "Description 3" },
    { id: 12, image: "img4.jpg", title: "Pin 4", description: "Description 4" },
  ];
 

  return (
    <PinGrid items={items} />    
  );
};

export default ContentGrid;