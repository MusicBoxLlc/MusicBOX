class UserAnalyticsService {
    constructor(analyticsDatabase) {
      this.analyticsDatabase = analyticsDatabase;
    }
  
    async trackUserActivity(userId, action, details) {
      try {
        // Validate user ID and action
        const isValidUser = this.validateUser(userId);
        const isValidAction = this.validateAction(action);
  
        if (!isValidUser || !isValidAction) {
          throw new Error('Invalid user or action.');
        }
  
        // Save user activity to the analytics database
        await this.analyticsDatabase.saveActivity(userId, action, details);
        return 'User activity tracked successfully.';
      } catch (error) {
        throw new Error(`Error tracking user activity: ${error.message}`);
      }
    }
  
    validateUser(userId) {
      // Simulated validation of user ID
      // Check if the user ID exists, is valid, etc.
      // Returning true for demonstration purposes
      return true;
    }
  
    validateAction(action) {
      // Simulated validation of action
      // Check if the action is valid, allowed, etc.
      // Returning true for demonstration purposes
      return true;
    }
  }
  
  // Example usage:
  // Create an instance of AnalyticsDatabase (e.g., a simulated database)
  const analyticsDatabase = new AnalyticsDatabase(); // Simulated analytics database
  
  // Create an instance of UserAnalyticsService
  const userAnalyticsService = new UserAnalyticsService(analyticsDatabase);
  
  // Usage example
  const userId = 'user123';
  const action = 'logged_in';
  const details = { timestamp: Date.now(), device: 'mobile' };
  
  userAnalyticsService.trackUserActivity(userId, action, details)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  