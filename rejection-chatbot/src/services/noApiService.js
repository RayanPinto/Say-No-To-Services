import axios from 'axios';

/**
 * Service to interact with No-as-a-Service API
 */
class NoApiService {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch a random rejection reason from the API
   * @returns {Promise<string>} A rejection reason
   */
  async getRandomRejection() {
    try {
      const response = await axios.get(`${this.baseUrl}/no`);
      return response.data.reason;
    } catch (error) {
      console.error('Error fetching from No-as-a-Service API:', error.message);
      // Fallback rejection if API fails
      return "I appreciate the thought, but I'll have to decline.";
    }
  }

  /**
   * Fetch multiple rejection reasons (for variety)
   * @param {number} count - Number of reasons to fetch
   * @returns {Promise<string[]>} Array of rejection reasons
   */
  async getMultipleRejections(count = 3) {
    const promises = Array(count).fill(null).map(() => this.getRandomRejection());
    return Promise.all(promises);
  }
}

export default NoApiService;

