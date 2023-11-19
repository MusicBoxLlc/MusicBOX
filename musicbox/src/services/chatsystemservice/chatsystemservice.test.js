// Import the ChatSystemService class (assuming it's located in the same directory)
const { ChatSystemService } = require('./ChatSystemService');

describe('ChatSystemService', () => {
  let chatService;

  beforeEach(() => {
    // Create a new instance of ChatSystemService before each test
    chatService = new ChatSystemService();
  });

  afterEach(() => {
    // Clear any setup or mocks after each test
    // (if there were any created during the test)
  });

  describe('addUser', () => {
    it('should add a new user to the chat system', () => {
      expect(chatService.addUser('user1', 'Alice')).toBe(
        'User Alice (user1) has joined the chat.'
      );
    });

    it('should not add an already existing user', () => {
      chatService.addUser('user1', 'Alice');
      expect(chatService.addUser('user1', 'Alice')).toBe(
        'User Alice (user1) is already in the chat.'
      );
    });
  });

  describe('sendMessage', () => {
    beforeEach(() => {
      chatService.addUser('user1', 'Alice');
      chatService.addUser('user2', 'Bob');
    });

    it('should send a message from one user to another', () => {
      expect(chatService.sendMessage('user1', 'user2', 'Hello, Bob!')).toBe(
        'Message sent from Alice to Bob: "Hello, Bob!"'
      );
    });

    it('should return an error for invalid user IDs', () => {
      expect(chatService.sendMessage('user1', 'user3', 'Hi there!')).toBe(
        'Invalid user IDs. Please check and try again.'
      );
    });
  });

  describe('getMessagesForUser', () => {
    beforeEach(() => {
      chatService.addUser('user1', 'Alice');
      chatService.addUser('user2', 'Bob');
      chatService.sendMessage('user1', 'user2', 'Hello, Bob!');
    });

    it('should retrieve messages for a specific user', () => {
      const messages = chatService.getMessagesForUser('user2');
      expect(messages.length).toBe(1);
      expect(messages[0].content).toBe('Hello, Bob!');
    });

    it('should return an error for an invalid user ID', () => {
      expect(chatService.getMessagesForUser('user3')).toBe(
        'Invalid user ID. Please provide a valid user ID.'
      );
    });
  });
});
