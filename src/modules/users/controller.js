import responds from '../../red/responds.js';
import User from "../../models/UserModel.js";

const UserModel = User.UserModel;

/**
 * Retrieve the authenticated user's information.
 * 
 * This function retrieves the current user's information based on their JWT authentication.
 * If the user is not found, it returns an error response.
 * 
 * @param {Object} req - Express request object containing user info after authentication
 * @param {Object} res - Express response object to send the result
 * @returns {Object} - JSON response with user data or an error message
 */
const viewUser = async (req, res) => {
    try {
        // Getting user after authentication with JWT
        const user = await UserModel.findOneRecord({ id: req.user.id });

        if (!user) {
            return responds.error(req, res, { message: 'Problem with getting user. Try again' }, 401);
        }

        // Returning data from this current user
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return responds.success(req, res, { data }, 200);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { viewUser};

