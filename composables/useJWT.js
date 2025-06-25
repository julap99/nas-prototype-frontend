/**
 * JWT Token utility composable
 * Provides functions to decode and validate JWT tokens
 * Useful for real backend integration
 */
export const useJWT = () => {
  
  /**
   * Decode JWT token payload (without verification)
   * This is for client-side parsing only - real validation should be done server-side
   */
  const decodeToken = (token) => {
    try {
      if (!token) return null;
      
      // JWT has 3 parts separated by dots: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      // Decode the payload (second part)
      const payload = parts[1];
      
      // Add padding if needed for base64 decoding
      const paddedPayload = payload + '=='.substring(0, (4 - payload.length % 4) % 4);
      
      // Decode base64
      const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
      
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };
  
  /**
   * Check if JWT token is expired
   */
  const isTokenExpired = (token) => {
    try {
      const payload = decodeToken(token);
      if (!payload || !payload.exp) return true;
      
      // JWT exp is in seconds, Date.now() is in milliseconds
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };
  
  /**
   * Get token expiration date
   */
  const getTokenExpiration = (token) => {
    try {
      const payload = decodeToken(token);
      if (!payload || !payload.exp) return null;
      
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  };
  
  /**
   * Get user data from JWT token
   */
  const getUserFromToken = (token) => {
    try {
      const payload = decodeToken(token);
      if (!payload) return null;
      
      // Common JWT claims for user data
      return {
        id: payload.sub || payload.userId || payload.id,
        username: payload.username || payload.preferred_username || payload.name,
        email: payload.email,
        roles: payload.roles || payload.authorities || [],
        permissions: payload.permissions || [],
        exp: payload.exp,
        iat: payload.iat
      };
    } catch (error) {
      console.error('Error extracting user from token:', error);
      return null;
    }
  };
  
  /**
   * Check if token format is valid (basic format check)
   */
  const isValidTokenFormat = (token) => {
    if (!token || typeof token !== 'string') return false;
    
    // Check if token has 3 parts separated by dots
    const parts = token.split('.');
    return parts.length === 3;
  };
  
  /**
   * Get time until token expires (in milliseconds)
   */
  const getTimeUntilExpiry = (token) => {
    try {
      const payload = decodeToken(token);
      if (!payload || !payload.exp) return 0;
      
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - currentTime;
      
      return timeLeft > 0 ? timeLeft * 1000 : 0; // Convert to milliseconds
    } catch (error) {
      console.error('Error calculating time until expiry:', error);
      return 0;
    }
  };
  
  return {
    decodeToken,
    isTokenExpired,
    getTokenExpiration,
    getUserFromToken,
    isValidTokenFormat,
    getTimeUntilExpiry
  };
}; 