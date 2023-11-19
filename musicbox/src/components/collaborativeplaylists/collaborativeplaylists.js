import React, { useState, useEffect } from 'react';
import PlaylistItem from './PlaylistItem';
import PlaylistForm from './PlaylistForm';
import { getCollaborativePlaylists, createPlaylist, deletePlaylist } from '../../services/PlaylistService';
import { isAuthenticated, getUserInfo } from '../../services/AuthService';

const CollaborativePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
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

    // Fetch collaborative playlists for authenticated user
    getCollaborativePlaylists(userId)
      .then(data => {
        setPlaylists(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching collaborative playlists. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleCreatePlaylist = (playlistData) => {
    if (!isAuthenticated()) {
      setError('User not authenticated.');
      return;
    }

    // Additional permission check could be added here for user roles or permissions

    const user = getUserInfo(); // Get user information after authentication
    const userId = user.id; // Assuming user object has an 'id' property

    // Simulated creation of playlist for authenticated user
    createPlaylist(userId, playlistData)
      .then(createdPlaylist => {
        setPlaylists([...playlists, createdPlaylist]); // Update playlists state with the new playlist
      })
      .catch(error => {
        setError('Error creating playlist. Please try again later.');
      });
  };

  const handleDeletePlaylist = (playlistId) => {
    if (!isAuthenticated()) {
      setError('User not authenticated.');
      return;
    }

    // Additional permission check could be added here for user roles or permissions

    // Simulated deletion of playlist for authenticated user
    deletePlaylist(playlistId)
      .then(() => {
        const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
        setPlaylists(updatedPlaylists); // Update playlists state after successful deletion
      })
      .catch(error => {
        setError('Error deleting playlist. Please try again later.');
      });
  };

  return (
    <div className="collaborative-playlists">
      <h2>Collaborative Playlists</h2>
      {loading ? (
        <p>Loading playlists...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <PlaylistForm onCreatePlaylist={handleCreatePlaylist} />
          <div className="playlist-items">
            {playlists.map(playlist => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                onDelete={handleDeletePlaylist}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CollaborativePlaylists;
