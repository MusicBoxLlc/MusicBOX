class DataFormatting {
    constructor() {}
  
    formatUserData(user) {
      // Validate and format user data for display or storage
      const formattedUser = {
        id: user.id,
        name: this.capitalizeName(user.name),
        email: user.email.toLowerCase(),
        created_at: this.formatDate(user.created_at),
        // Add more formatted data as needed
      };
      return formattedUser;
    }
  
    capitalizeName(name) {
      // Capitalize the first letter of each word in the name
      return name.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  
    formatDate(date) {
      // Format date to a readable format (e.g., MM/DD/YYYY)
      const formattedDate = new Date(date).toLocaleDateString('en-US');
      return formattedDate;
    }
  }
  
  // Example usage:
  const dataFormatting = new DataFormatting();
  
  // Usage example
  const user = {
    id: 1,
    name: 'john doe',
    email: 'john@example.com',
    created_at: '2023-11-19T12:00:00Z',
    // Add more user data as needed
  };
  
  const formattedUser = dataFormatting.formatUserData(user);
  console.log(formattedUser);
  