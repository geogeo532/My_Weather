import React, { useState } from 'react';
import "../css/favorit.css"

function Favorites() {
  const [inputValue, setInputValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddToFavorites = () => {
    if (inputValue.trim() !== '') {
      setFavorites((prevFavorites) => [...prevFavorites, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a city"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddToFavorites}>Add to Favorites</button>

      {(inputValue === '' && document.activeElement === document.querySelector('input')) && (
        <div>
          <h3>Favorites:</h3>
          <ul>
            {favorites.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Favorites;