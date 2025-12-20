import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

/**
 * Generate JWT Access Token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'ray-egypt',
    audience: 'ray-users'
  });
};

/**
 * Generate JWT Refresh Token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    issuer: 'ray-egypt',
    audience: 'ray-users'
  });
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokenPair = (payload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  
  return {
    accessToken,
    refreshToken,
    expiresIn: JWT_EXPIRES_IN,
    tokenType: 'Bearer'
  };
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'ray-egypt',
      audience: 'ray-users'
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode JWT Token without verification (for debugging)
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

/**
 * Create JWT payload for user
 */
export const createJWTPayload = (user) => {
  return {
    userId: user._id,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    subscription: user.subscription?.plan || 'free'
  };
};

/**
 * Verify refresh token and generate new access token
 */
export const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = verifyToken(refreshToken);
    
    // Generate new access token with same payload
    const newPayload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      isEmailVerified: decoded.isEmailVerified,
      subscription: decoded.subscription
    };
    
    const newAccessToken = generateAccessToken(newPayload);
    
    return {
      accessToken: newAccessToken,
      refreshToken,
      expiresIn: JWT_EXPIRES_IN,
      tokenType: 'Bearer'
    };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyToken,
  decodeToken,
  extractTokenFromHeader,
  createJWTPayload,
  refreshAccessToken
};
