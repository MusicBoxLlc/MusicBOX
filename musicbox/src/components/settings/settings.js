import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings } from './api'; // Simulated API functions

const Settings = ({ userId }) => {
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user settings on component mount
    getUserSettings(userId)
      .then((settings) => {
        setEmail(settings.email);
        setNotificationsEnabled(settings.notificationsEnabled);
        setDarkModeEnabled(settings.darkModeEnabled);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching settings:', error);
        setLoading(false);
      });
  }, [userId]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const saveSettings = () => {
    const updatedSettings = {
      email,
      notificationsEnabled,
      darkModeEnabled,
    };

    // Simulated API call to update user settings
    updateUserSettings(userId, updatedSettings)
      .then(() => {
        // Show success message or perform additional actions upon successful save
        console.log('Settings saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
        // Show error message or handle the error as needed
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="setting-item">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="setting-item">
        <label>Notifications:</label>
        <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
      </div>
      <div className="setting-item">
        <label>Dark Mode:</label>
        <input type="checkbox" checked={darkModeEnabled} onChange={toggleDarkMode} />
      </div>
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
};

export default Settings;
