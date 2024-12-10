import React from "react";
import PinCard from 'src/AuthPages/PageComponents/Home/PinCard.jsx'
import Loading from 'src/AuthPages/PageComponents/Home/Loading.jsx'


const ContentGrid = () => {
    return (
    <div>
    <PinCard />
    <Loading />
    </div>
    );
}

export default ContentGrid;


/*
const MasonryGrid = ({ pins }) => (
  <div className="masonry-grid">
    {pins.map(pin => (
      <PinCard key={pin.id} pin={pin} />
    ))}
  </div>
);
*/