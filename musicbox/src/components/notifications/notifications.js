import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      message,
      type,
    };

    setNotifications([...notifications, newNotification]);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  // Function to remove a notification by ID
  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // Simulated notification service integration
  const notify = (message, type) => {
    // Here, you can call your actual notification service (e.g., Toast, SnackBar, etc.)
    addNotification(message, type);
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <button onClick={() => notify('New info notification!', 'info')}>
        Add Info Notification
      </button>
      <button onClick={() => notify('Warning! Something went wrong.', 'warning')}>
        Add Warning Notification
      </button>
      <button onClick={() => notify('Error! Action failed.', 'error')}>
        Add Error Notification
      </button>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <p>{notification.message}</p>
            <button onClick={() => removeNotification(notification.id)}>Dismiss</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
