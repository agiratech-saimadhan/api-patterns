import { Router } from "express";
import passport from "passport";
import getCurrentUser from "../../../handlers/users/getCurrentUser/getCurrentUser";
import getUser from "../../../handlers/users/getUser/getUser";

const userRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get details of current logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: User not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     InternalServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */

/**
 * Get details of current logged in user
 * @route GET /me
 * @group user - Operations about user
 * @security bearerAuth
 * @returns {object} 200 - user response
 * @returns {Error}  default - Unexpected error
 */
userRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get details of User by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: User not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     InternalServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */

/**
 * Get details of  user by ID
 * @route GET /
 * @group user - Operations about user
 * @security bearerAuth
 * @returns {object} 200 - user response
 * @returns {Error}  default - Unexpected error
 */
userRouter.get("/:id", getUser);

export default userRouter;
