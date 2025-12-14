import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// JWT Strategy for API authentication
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      issuer: 'ray-egypt',
      audience: 'ray-users'
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);
        
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        
        if (!user.isActive) {
          return done(null, false, { message: 'User account is deactivated' });
        }
        
        // Update last login
        await user.updateLastLogin();
        
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findByGoogleId(profile.id);
        
        if (user) {
          // User exists, update last login
          await user.updateLastLogin();
          return done(null, user);
        }
        
        // Check if user exists with same email
        user = await User.findByEmail(profile.emails[0].value);
        
        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.isEmailVerified = true;
          if (!user.avatar) {
            user.avatar = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }
        
        // Create new user from Google profile
        const newUser = await User.createGoogleUser({
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0].value
        });
        
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Middleware to authenticate JWT token
export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: info?.message || 'Invalid token'
      });
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware to check user role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - No user found'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden - Insufficient permissions'
      });
    }
    
    next();
  };
};

// Middleware to check if user is verified
export const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }
  
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required'
    });
  }
  
  next();
};

// Middleware to check if user has active subscription
export const requireSubscription = (...plans) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    const userPlan = req.user.subscription?.plan || 'free';
    
    if (plans.length > 0 && !plans.includes(userPlan)) {
      return res.status(403).json({
        success: false,
        message: 'Premium subscription required',
        requiredPlans: plans
      });
    }
    
    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    req.user = user || null;
    next();
  })(req, res, next);
};

export default passport;
