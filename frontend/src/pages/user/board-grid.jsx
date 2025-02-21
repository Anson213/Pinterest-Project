import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';
import imagesloaded from 'imagesloaded';
import Board from '../../high-order-component/user/board-card';

const MasonryGrid = ({ items }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {

      const msnry = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 8, 
      });

      imagesloaded(gridRef.current, () => {
        msnry.layout();
      });

      
    }
  }, [items]);

  return (
    <div className="grid" ref={gridRef}>
      <div className="grid-sizer"></div>
      {items.map((item, index) => (
        <div key={index} className="grid-item">
          <Board {...item} />
        </div>
      ))}
    </div>
  );
};
MasonryGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MasonryGrid;