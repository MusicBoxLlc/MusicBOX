import React from 'react';

const SocialSharing = () => {
  const handleShare = (platform) => {
    // Simulated sharing functionality
    switch (platform) {
      case 'facebook':
        // Logic to share on Facebook
        console.log('Shared on Facebook');
        break;
      case 'twitter':
        // Logic to share on Twitter
        console.log('Shared on Twitter');
        break;
      case 'instagram':
        // Logic to share on Instagram
        console.log('Shared on Instagram');
        break;
      default:
        break;
    }
  };

  return (
    <div className="social-sharing-container">
      <h2>Social Sharing</h2>
      <button onClick={() => handleShare('facebook')}>Share on Facebook</button>
      <button onClick={() => handleShare('twitter')}>Share on Twitter</button>
      <button onClick={() => handleShare('instagram')}>Share on Instagram</button>
    </div>
  );
};

export default SocialSharing;
