import React, { useState, useEffect } from 'react';
import FavoriteItem from './FavoriteItem';
import { getUserFavorites, getUserRecommendations } from '../../services/UserService';
import { isAuthenticated, getUserInfo } from '../../services/AuthService';

const FavoritesAndRecommendations = () => {
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated()) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }

    const user = getUserInfo(); // Get user information after authentication
    const userId = user.id; // Assuming user object has an 'id' property

    // Fetch user favorites and recommendations for authenticated user
    getUserFavorites(userId)
      .then(favoritesData => {
        setFavorites(favoritesData);
        return getUserRecommendations(userId);
      })
      .then(recommendationsData => {
        setRecommendations(recommendationsData);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching favorites and recommendations. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="favorites-and-recommendations">
      <h2>Favorites and Recommendations</h2>
      {loading ? (
        <p>Loading favorites and recommendations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="favorites">
            <h3>Favorites</h3>
            {favorites.length > 0 ? (
              favorites.map(favorite => (
                <FavoriteItem key={favorite.id} item={favorite} />
              ))
            ) : (
              <p>No favorites found.</p>
            )}
          </div>

          <div className="recommendations">
            <h3>Recommendations</h3>
            {recommendations.length > 0 ? (
              recommendations.map(recommendation => (
                <FavoriteItem key={recommendation.id} item={recommendation} />
              ))
            ) : (
              <p>No recommendations found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesAndRecommendations;
