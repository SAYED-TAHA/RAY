import User from '../../../models/User.js';

const mapRoleToApi = (role) => {
  if (role === 'user') return 'customer';
  return role;
};

const mapRoleFromApi = (role) => {
  if (role === 'customer') return 'user';
  return role;
};

const mapUserToAdminDto = (user) => {
  const u = user?.toObject ? user.toObject() : user;
  return {
    _id: u._id,
    id: u._id?.toString?.() || u.id,
    name: u.name,
    email: u.email,
    phone: u.businessInfo?.phone || '',
    role: mapRoleToApi(u.role),
    status: u.isActive ? 'active' : 'inactive',
    joinDate: u.createdAt ? new Date(u.createdAt).toISOString() : '',
    lastLogin: u.lastLogin ? new Date(u.lastLogin).toISOString() : '',
    verified: Boolean(u.isEmailVerified),
    avatar: u.avatar || ''
  };
};

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.role) filter.role = mapRoleFromApi(req.query.role);
    if (req.query.status) {
      if (req.query.status === 'active') filter.isActive = true;
      if (req.query.status === 'inactive') filter.isActive = false;
    }
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { 'businessInfo.phone': { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(filter)
    ]);

    res.status(200).json({
      users: users.map(mapUserToAdminDto),
      pagination: { current: page, pages: Math.ceil(total / limit), total, limit }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(mapUserToAdminDto(user));
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.role) update.role = mapRoleFromApi(update.role);
    if (update.status) {
      if (update.status === 'active') update.isActive = true;
      if (update.status === 'inactive') update.isActive = false;
      delete update.status;
    }
    if (update.verified !== undefined) {
      update.isEmailVerified = Boolean(update.verified);
      delete update.verified;
    }
    if (update.phone !== undefined) {
      update.businessInfo = { ...(update.businessInfo || {}), phone: update.phone };
      delete update.phone;
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(mapUserToAdminDto(user));
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: { $sum: { $cond: ['$isActive', 1, 0] } },
          adminUsers: { $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] } },
          merchantUsers: { $sum: { $cond: [{ $eq: ['$role', 'merchant'] }, 1, 0] } },
          customerUsers: { $sum: { $cond: [{ $eq: ['$role', 'user'] }, 1, 0] } },
          verifiedUsers: { $sum: { $cond: ['$isEmailVerified', 1, 0] } }
        }
      }
    ]);

    res.status(200).json(stats[0] || {
      totalUsers: 0,
      activeUsers: 0,
      adminUsers: 0,
      merchantUsers: 0,
      customerUsers: 0,
      verifiedUsers: 0
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
