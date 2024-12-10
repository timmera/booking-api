import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getUsers from '../services/users/getUsers.js';
import createUser from '../services/users/createUser.js';
import getUserById from '../services/users/getUserById.js';
import updateUserById from '../services/users/updateUserById.js';
import deleteUser from '../services/users/deleteUser.js';
import getUserByUsername from '../services/users/getUserByUserName.js';
import getUserByEmail from '../services/users/getUserByEmail.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from '../middleware/badRequestErrorHandler.js';

const router = express.Router();

router.get(
  '/',
  async (req, res, next) => {
    const username = req.query.username;
    const email = req.query.email;
    try {
      if (username) {
        const user = await getUserByUsername(username);
        return res.status(200).json(user);
      }
      if (email) {
        const user = await getUserByEmail(email);
        return res.status(200).json(user);
      } else {
        const users = await getUsers();
        res.status(200).json(users);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post(
  '/',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const newUser = await createUser(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
  badRequestErrorHandler
);

router.get(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.put(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;

      const updatedUser = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  badRequestErrorHandler
);

router.delete(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUserId = await deleteUser(id);

      res.status(200).json({
        message: `User with id ${deletedUserId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
