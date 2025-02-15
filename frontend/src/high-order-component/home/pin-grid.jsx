import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';
import imagesloaded from 'imagesloaded';
import Pin from './pin-card'; // Import the Pin component
import './pin-grid.css'; // Import the CSS file

const MasonryGrid = ({ items }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initialize Masonry
      const msnry = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 10, // Add some gutter space between items
      });

      // Use imagesloaded to ensure images are loaded before layout
      imagesloaded(gridRef.current, () => {
        msnry.layout();
      });

      // Add a slight vertical stagger effect
      const gridItems = gridRef.current.querySelectorAll('.grid-item');
      gridItems.forEach((item) => {
        const randomStagger = Math.floor(Math.random() * 20) - 4; // Random value between -10 and 10
        item.style.marginTop = `${randomStagger}px`;
      });
    }
  }, [items]);

   let item = items || [];

  return (
    <div className="grid" ref={gridRef}>
      <div className="grid-sizer"></div>
      {item.map((item,) => (
        <div key={item.id} className="grid-item">
          <Pin
            image={item.image}
            title={item.title}
            description={item.description}
            user={item.user}
          />
        </div>
      ))}
    </div>
  );
};


MasonryGrid.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        user: PropTypes.string, // Optional, depending on your data
      })
    ),
  };


export default MasonryGrid;