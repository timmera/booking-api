import express from 'express';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import notAuthorizedErrorHandler from '../middleware/notAuthorizedErrorHandler.js';
import getHosts from '../services/hosts/getHosts.js';
import createHost from '../services/hosts/createHost.js';
import getHostById from '../services/hosts/getHostById.js';
import updateHostById from '../services/hosts/updateHostById.js';
import deleteHost from '../services/hosts/deleteHost.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const newHost = await createHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(201).json(newHost);
    } catch (error) {
      next(error);
    }
  },
  notAuthorizedErrorHandler
);

router.get(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);

      res.status(200).json(host);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  notAuthorizedErrorHandler
);

router.put(
  '/:id',

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;

      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ message: 'Bad Request: Missing or empty request body' });
      }

      const updatedHost = await updateHostById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(200).json(updatedHost);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  notAuthorizedErrorHandler
);

router.delete(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedHostId = await deleteHost(id);

      res.status(200).json({
        message: `Host with id ${deletedHostId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  notAuthorizedErrorHandler
);

export default router;
