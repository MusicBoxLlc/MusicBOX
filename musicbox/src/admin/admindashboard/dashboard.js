// This is a basic example to showcase the structure and functionality of an admin dashboard

// Fetch necessary DOM elements
const userCountElement = document.getElementById('user-count');
const revenueElement = document.getElementById('revenue');
const recentActivitiesList = document.getElementById('recent-activities');

// Simulated data (replace this with actual data fetched from backend)
const userCount = 1023;
const revenue = '$25,000';
const recentActivities = [
  { id: 1, action: 'Added new artist', timestamp: '2023-11-15 10:30:00' },
  { id: 2, action: 'Processed payments', timestamp: '2023-11-14 15:20:00' },
  // Add more recent activities as needed
];

// Update the dashboard with fetched data
userCountElement.textContent = userCount;
revenueElement.textContent = revenue;

// Display recent activities
recentActivities.forEach(activity => {
  const listItem = document.createElement('li');
  listItem.textContent = `${activity.action} - ${activity.timestamp}`;
  recentActivitiesList.appendChild(listItem);
});
