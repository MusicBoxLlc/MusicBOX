import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PerformanceVideos from './PerformanceVideos';
import SongPlaylist from './SongPlaylist';
import PhotoGallery from './PhotoGallery';
import BookingRequestForm from './BookingRequestForm';
import LiveAudienceInteraction from './LiveAudienceInteraction';
import ArtistReviews from './ArtistReviews';
import { getArtistProfile, submitBookingRequest } from '../services/ArtistService';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const [artistProfile, setArtistProfile] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    date: '',
    venue: '',
    message: '',
    // Other necessary fields for booking
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArtistProfile(artistId)
      .then(data => {
        setArtistProfile(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching artist profile. Please try again later.');
        setLoading(false);
      });
  }, [artistId]);

  const handleBookingFormSubmit = (event) => {
    event.preventDefault();
    // Validate form fields before submission
    if (!validateBookingForm()) {
      setError('Please fill in all required fields.');
      return;
    }

    submitBookingRequest(artistId, bookingFormData)
      .then(() => {
        setBookingSuccess(true);
        // Additional logic after successful booking request submission
      })
      .catch(error => {
        setError('Error submitting booking request. Please try again later.');
      });
  };

  const validateBookingForm = () => {
    // Perform input validations
    const { date, venue, message } = bookingFormData;
    return date.trim() !== '' && venue.trim() !== '' && message.trim() !== '';
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingFormData({ ...bookingFormData, [name]: value });
  };

  return (
    <div className="artist-profile-container">
      {loading ? (
        <p>Loading artist profile...</p>
      ) : error ? (
        <p>{error}</p>
      ) : artistProfile ? (
        <>
          <h2>{artistProfile.name}'s Profile</h2>
          <PerformanceVideos videos={artistProfile.performanceVideos} />
          <SongPlaylist songs={artistProfile.songPlaylist} />
          <PhotoGallery photos={artistProfile.photoGallery} />
          <BookingRequestForm
            bookingFormData={bookingFormData}
            onInputChange={handleInputChange}
            onFormSubmit={handleBookingFormSubmit}
            bookingSuccess={bookingSuccess}
          />
          <LiveAudienceInteraction artistId={artistId} />
          <ArtistReviews reviews={artistProfile.artistReviews} />
        </>
      ) : (
        <p>No artist profile found for the provided ID.</p>
      )}
    </div>
  );
};

export default ArtistProfile;
