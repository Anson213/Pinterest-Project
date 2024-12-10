import React, { useState } from 'react';

const InfoInput = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    board: '',
    taggedTopic: '',
  });

  const [moreOptions, setMoreOptions] = useState(false); // State for dropdown visibility

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="Inputs">

      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Add a title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add a detailed description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="link">Link</label>
        <input
          type="url"
          id="link"
          name="link"
          placeholder="Add a link"
          value={formData.link}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="board">Board</label>
        <select
          id="board"
          name="board"
          value={formData.board}
          onChange={handleInputChange}
        >
          <option value="">Select a board</option>
          <option value="recipes">Recipes</option>
          <option value="travel">Travel</option>
          <option value="design">Design</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="taggedTopic">Tagged Topic</label>
        <input
          type="text"
          id="taggedTopic"
          name="taggedTopic"
          placeholder="Add a topic (e.g., Photography)"
          value={formData.taggedTopic}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="moreOptions">More Options</label>
        <button
          type="button"
          onClick={() => setMoreOptions((prev) => !prev)}
          className="more-options-btn"
        >
          {moreOptions ? 'Hide Options' : 'Show Options'}
        </button>
        {moreOptions && (
          <div className="dropdown">
            <div className="dropdown-item">Option 1: Example</div>
            <div className="dropdown-item">Option 2: Example</div>
            <div className="dropdown-item">Option 3: Example</div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InfoInput;
