import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Change password controller
export const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Verify user ID from token matches the requested user ID
    if (req.user.id !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to change this user\'s password' 
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update user password
    user.password = hashedPassword;
    user.updateAt = new Date();
    
    // Save updated user
    await user.save();

    res.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
  } catch (err) {
    console.error('Password change error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};