import React, { useState, useEffect } from 'react';
import { fetchSongs } from '../../services/SongService';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(new Audio());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    audioPlayer.volume = volume;
  }, [audioPlayer, volume]);

  useEffect(() => {
    setLoading(true);
    fetchSongs()
      .then(songData => {
        if (songData && songData.length > 0) {
          setSongs(songData);
          setLoading(false);
        } else {
          setError('No songs found.');
          setLoading(false);
        }
      })
      .catch(err => {
        setError('Error fetching songs. Please try again later.');
        setLoading(false);
      });
  }, []);

  const playSong = (song) => {
    if (song === currentSong && isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      audioPlayer.src = song.audioUrl;
      audioPlayer.load();
      audioPlayer.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    audioPlayer.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.currentTime);
    setDuration(audioPlayer.duration);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioPlayer.volume = value;
  };

  const handleSongEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="music-player">
      <h2>Music Player</h2>
      {loading ? (
        <p>Loading songs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="song-list">
            {songs.map(song => (
              <div key={song.id} className="song-item">
                <p>{song.title}</p>
                <button onClick={() => playSong(song)}>
                  {currentSong === song && isPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
            ))}
          </div>
          {currentSong && (
            <div className="current-song">
              <p>Now Playing: {currentSong.title}</p>
              <div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => audioPlayer.currentTime = e.target.value}
                />
                <br />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                />
              </div>
              <button onClick={pauseSong}>Pause</button>
            </div>
          )}
        </>
      )}
      <audio
        ref={audioPlayer}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnded}
        onError={() => setError('Error loading the audio.')}
      />
    </div>
  );
};

export default MusicPlayer;
