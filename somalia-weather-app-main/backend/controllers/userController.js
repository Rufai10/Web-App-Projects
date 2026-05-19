const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (Admin only)
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.role === 'Admin') {
                res.status(400);
                throw new Error('Cannot delete an admin user');
            }
            await User.deleteOne({ _id: user._id });
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    deleteUser
};
