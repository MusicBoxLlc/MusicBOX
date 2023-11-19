class CommunityForumService {
    constructor(database) {
      this.database = database; // Reference to a database
    }
  
    async createTopic(userId, title, content) {
      if (!userId || !title || !content) {
        throw new Error('Invalid input. Please provide valid data.');
      }
  
      try {
        const newTopic = {
          userId,
          title,
          content,
          created_at: new Date().toISOString(),
          replies: [],
        };
  
        // Simulated database query to store the new topic
        await this.database.topics.create(newTopic);
        return 'Topic created successfully.';
      } catch (error) {
        throw new Error('Failed to create topic. Please try again later.');
      }
    }
  
    async getTopics(page = 1, limit = 10) {
      try {
        // Simulated database query to retrieve paginated topics
        const offset = (page - 1) * limit;
        return await this.database.topics.findAll({
          offset,
          limit,
          order: [['created_at', 'DESC']],
          include: [{ model: this.database.replies }],
        });
      } catch (error) {
        throw new Error('Failed to fetch topics. Please try again later.');
      }
    }
  
    async addReply(topicId, userId, replyContent) {
      if (!topicId || !userId || !replyContent) {
        throw new Error('Invalid input. Please provide valid data.');
      }
  
      try {
        const reply = {
          topicId,
          userId,
          content: replyContent,
          created_at: new Date().toISOString(),
        };
  
        // Simulated database query to add a reply to a topic
        await this.database.replies.create(reply);
        return 'Reply added successfully.';
      } catch (error) {
        throw new Error('Failed to add reply. Please try again later.');
      }
    }
  
    async getTopicWithReplies(topicId) {
      if (!topicId) {
        throw new Error('Invalid input. Please provide valid data.');
      }
  
      try {
        // Simulated database query to retrieve a topic with its replies
        return await this.database.topics.findOne({
          where: { id: topicId },
          include: [{ model: this.database.replies }],
        });
      } catch (error) {
        throw new Error('Failed to fetch topic and replies. Please try again later.');
      }
    }
  
    // Additional methods for editing/deleting topics, user permissions, etc.
  }
  
  // Example usage:
  const forumService = new CommunityForumService(database); // Pass the database instance
  