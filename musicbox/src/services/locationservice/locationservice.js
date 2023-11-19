class LocationService {
    constructor(mapService) {
      this.mapService = mapService; // Reference to an external map service API
      this.locations = new Map(); // Simulated map to store location data
    }
  
    async addLocation(userId, latitude, longitude) {
      if (!userId || !latitude || !longitude) {
        throw new Error('Invalid input. Please provide valid data.');
      }
  
      // Simulated check for valid coordinates
      if (!this.isValidCoordinates(latitude, longitude)) {
        throw new Error('Invalid coordinates.');
      }
  
      // Simulated handling of location permissions
  
      // Simulated integration with an external map service API to get location details
      const locationDetails = await this.mapService.getLocationDetails(latitude, longitude);
  
      this.locations.set(userId, { latitude, longitude, locationDetails });
      return 'Location added successfully.';
    }
  
    getLocation(userId) {
      if (!userId) {
        throw new Error('Invalid input. Please provide valid data.');
      }
  
      if (!this.locations.has(userId)) {
        return 'Location not found.';
      }
  
      const { latitude, longitude, locationDetails } = this.locations.get(userId);
      return { latitude, longitude, locationDetails };
    }
  
    // Other methods like calculateDistance, isValidCoordinates, etc.
  
    // Simulated method for checking valid coordinates
    isValidCoordinates(latitude, longitude) {
      // Add actual logic for validating coordinates (e.g., ranges, format)
      return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
    }
  }
  
  // Example usage:
  // Mock external map service API
  const mockMapService = {
    getLocationDetails: async (lat, lon) => {
      // Simulated API call to get location details
      return `Location details for coordinates (${lat}, ${lon})`;
    },
  };
  
  const locationService = new LocationService(mockMapService);
  await locationService.addLocation('user123', 40.7128, -74.006);
  console.log(locationService.getLocation('user123'));
  