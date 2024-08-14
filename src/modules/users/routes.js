import { Router } from 'express'
import ctrl from './controller.js'
import auth from '../../middleware/auth.js';

const {viewUser, onlyAdmin, onlyAdminModerator} = ctrl

const router = Router();

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get the current user
 *     description: Retrieve the current user's information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/api/users/current', auth.ensureAuthenticated, viewUser);

export default router;