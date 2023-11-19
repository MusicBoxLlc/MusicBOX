import React, { useState, useEffect } from 'react';
import ArtistItem from './ArtistItem';
import { getFollowedArtists, followArtist, unfollowArtist } from '../../services/ArtistService';
import { isAuthenticated, getUserInfo } from '../../services/AuthService';

const FollowedArtists = () => {
  const [followedArtists, setFollowedArtists] = useState([]);
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

    // Fetch followed artists for authenticated user
    getFollowedArtists(userId)
      .then(data => {
        setFollowedArtists(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching followed artists. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleFollowArtist = (artistId) => {
    if (!isAuthenticated()) {
      setError('User not authenticated.');
      return;
    }

    // Simulated follow artist for authenticated user
    const user = getUserInfo(); // Get user information after authentication
    const userId = user.id; // Assuming user object has an 'id' property

    followArtist(userId, artistId)
      .then(followedArtist => {
        setFollowedArtists([...followedArtists, followedArtist]); // Update followed artists after successful follow
      })
      .catch(error => {
        setError('Error following artist. Please try again later.');
      });
  };

  const handleUnfollowArtist = (artistId) => {
    if (!isAuthenticated()) {
      setError('User not authenticated.');
      return;
    }

    // Simulated unfollow artist for authenticated user
    const updatedFollowedArtists = followedArtists.filter(artist => artist.id !== artistId);
    setFollowedArtists(updatedFollowedArtists); // Update followed artists after successful unfollow
    unfollowArtist(artistId)
      .catch(error => {
        setError('Error unfollowing artist. Please try again later.');
      });
  };

  return (
    <div className="followed-artists">
      <h2>Followed Artists</h2>
      {loading ? (
        <p>Loading followed artists...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="artists-list">
          {followedArtists.length > 0 ? (
            followedArtists.map(artist => (
              <ArtistItem
                key={artist.id}
                artist={artist}
                onFollow={handleFollowArtist}
                onUnfollow={handleUnfollowArtist}
              />
            ))
          ) : (
            <p>No followed artists found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowedArtists;
