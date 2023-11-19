import React, { useState, useEffect } from 'react';
import FeaturedArtists from './FeaturedArtists';
import LivePerformances from './LivePerformances';
import ExclusiveContent from './ExclusiveContent';
import LocalGigsMap from './LocalGigsMap';
import axios from 'axios';

const Home = () => {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [livePerformances, setLivePerformances] = useState([]);
  const [exclusiveContent, setExclusiveContent] = useState([]);
  const [localGigs, setLocalGigs] = useState([]);

  useEffect(() => {
    // Fetch featured artists
    axios.get('https://api.example.com/featured-artists')
      .then(response => setFeaturedArtists(response.data))
      .catch(error => console.error('Error fetching featured artists:', error));

    // Fetch live performances
    axios.get('https://api.example.com/live-performances')
      .then(response => setLivePerformances(response.data))
      .catch(error => console.error('Error fetching live performances:', error));

    // Fetch exclusive content
    axios.get('https://api.example.com/exclusive-content')
      .then(response => setExclusiveContent(response.data))
      .catch(error => console.error('Error fetching exclusive content:', error));

    // Fetch local gigs
    axios.get('https://api.example.com/local-gigs')
      .then(response => setLocalGigs(response.data))
      .catch(error => console.error('Error fetching local gigs:', error));
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to YourMusicApp</h1>
      <FeaturedArtists artists={featuredArtists} />
      <LivePerformances performances={livePerformances} />
      <ExclusiveContent content={exclusiveContent} />
      <LocalGigsMap gigs={localGigs} />
    </div>
  );
};

export default Home;
