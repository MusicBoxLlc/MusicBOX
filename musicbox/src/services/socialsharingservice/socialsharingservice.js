class SocialSharingService {
    constructor(socialMediaAPI) {
      this.socialMediaAPI = socialMediaAPI;
    }
  
    async shareToSocialMedia(userId, content) {
      try {
        // Authenticate user and validate content
        const isValidUser = await this.validateUser(userId);
        const isValidContent = this.validateContent(content);
  
        if (!isValidUser || !isValidContent) {
          throw new Error('Invalid user or content.');
        }
  
        // Share content via the social media API
        const shareResult = await this.socialMediaAPI.share(userId, content);
  
        if (shareResult.success) {
          return 'Content shared successfully.';
        } else {
          throw new Error('Failed to share content.');
        }
      } catch (error) {
        throw new Error(`Error sharing content: ${error.message}`);
      }
    }
  
    async validateUser(userId) {
      // Simulated user validation, could involve database checks or authentication services
      // Returning true for demonstration purposes
      return true;
    }
  
    validateContent(content) {
      // Simulated validation of content
      // Check content length, format, etc.
      // Returning true for demonstration purposes
      return true;
    }
  }
  
  // Example usage:
  // Create an instance of SocialMediaAPI (e.g., Facebook, Twitter, etc.)
  const socialMediaAPI = new SocialMediaAPI(); // Simulated social media API
  
  // Create an instance of SocialSharingService
  const socialSharingService = new SocialSharingService(socialMediaAPI);
  
  // Usage example
  const userId = 'user123';
  const content = 'Check out this awesome post!';
  
  socialSharingService.shareToSocialMedia(userId, content)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  