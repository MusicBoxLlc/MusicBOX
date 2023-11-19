class Security {
    constructor() {}
  
    static generateRandomToken(length = 20) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
      }
  
      return token;
    }
  
    static hashPassword(password) {
      // Simulated password hashing using a simple method (for demonstration purposes)
      const salt = 'randomSaltForHashing';
      const hashedPassword = `${password}-${salt}`; // Using a simple hashing mechanism
  
      return hashedPassword;
    }
  
    static verifyPassword(password, hashedPassword) {
      // Simulated password verification (for demonstration purposes)
      const salt = 'randomSaltForHashing';
      const expectedHash = `${password}-${salt}`;
  
      return hashedPassword === expectedHash;
    }
  
    static sanitizeInput(input) {
      // Simulated input sanitization to prevent XSS attacks (for demonstration purposes)
      return input.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
    }
  }
  
  // Example usage:
  // Generate a random token
  const randomToken = Security.generateRandomToken();
  console.log('Random Token:', randomToken);
  
  // Hash a password
  const password = 'mySecurePassword';
  const hashedPassword = Security.hashPassword(password);
  console.log('Hashed Password:', hashedPassword);
  
  // Verify a password
  const isPasswordValid = Security.verifyPassword(password, hashedPassword);
  console.log('Password Validation:', isPasswordValid ? 'Password is valid.' : 'Password is invalid.');
  
  // Sanitize input
  const userInput = '<script>alert("XSS attack!");</script>';
  const sanitizedInput = Security.sanitizeInput(userInput);
  console.log('Sanitized Input:', sanitizedInput);
  