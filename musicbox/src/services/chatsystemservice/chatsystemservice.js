class ChatSystem {
    constructor() {
      this.users = new Map(); // Map to store users and their chat messages
    }
  
    // Method to add a new user to the chat system
    addUser(userId, username) {
      if (!this.users.has(userId)) {
        this.users.set(userId, { username, messages: [] });
        return `User ${username} (${userId}) has joined the chat.`;
      } else {
        return `User ${username} (${userId}) is already in the chat.`;
      }
    }
  
    // Method to send a message from one user to another
    sendMessage(senderId, receiverId, messageContent) {
      if (!this.users.has(senderId) || !this.users.has(receiverId)) {
        return 'Invalid user IDs. Please check and try again.';
      }
  
      const senderUsername = this.users.get(senderId).username;
      const receiverUsername = this.users.get(receiverId).username;
      const message = {
        from: senderUsername,
        content: messageContent,
        timestamp: new Date().toISOString(),
      };
  
      this.users.get(senderId).messages.push(message);
      return `Message sent from ${senderUsername} to ${receiverUsername}: "${messageContent}"`;
    }
  
    // Method to retrieve messages for a particular user
    getMessagesForUser(userId) {
      if (!this.users.has(userId)) {
        return 'Invalid user ID. Please provide a valid user ID.';
      }
  
      return this.users.get(userId).messages;
    }
  }
  
  // Example usage:
  const chatSystem = new ChatSystem();
  console.log(chatSystem.addUser('user1', 'Alice'));
  console.log(chatSystem.addUser('user2', 'Bob'));
  
  console.log(chatSystem.sendMessage('user1', 'user2', 'Hello, Bob!'));
  console.log(chatSystem.sendMessage('user2', 'user1', 'Hi, Alice!'));
  
  console.log(chatSystem.getMessagesForUser('user1'));
  console.log(chatSystem.getMessagesForUser('user2'));
  