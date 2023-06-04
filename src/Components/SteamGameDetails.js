import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SteamGameDetails = () => {
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          'https://store.steampowered.com/api/appdetails?appids=238960'
        );
        const data = response.data;
        setGameDetails(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, []);

  return (
    <div>
      {gameDetails ? (
        <div>
          <h2>{gameDetails['238960'].data.name}</h2>
          <p>{gameDetails['238960'].data.description}</p>
          {/* Add any other information you want to display */}
        </div>
      ) : (
        <p>Loading game details...</p>
      )}
    </div>
  );
};

export default SteamGameDetails;
