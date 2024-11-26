import express from 'express';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import notAuthorizedErrorHandler from '../middleware/notAuthorizedErrorHandler.js';
import getAmenities from '../services/amenities/getAmenities.js';
import createAmenity from '../services/amenities/createAmenity.js';
import getAmenityById from '../services/amenities/getAmenityById.js';
import updateAmenityById from '../services/amenities/updateAmenityById.js';
import deleteAmenity from '../services/amenities/deleteAmenity.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const { name } = req.body;
      const newAmenity = await createAmenity(name);
      res.status(201).json(newAmenity);
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
      const amenity = await getAmenityById(id);

      res.status(200).json(amenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  notAuthorizedErrorHandler
);

router.put(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'No valid body in request!' });
      }

      const updatedAmenity = await updateAmenityById(id, name);
      res.status(200).json(updatedAmenity);
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
      const deletedAmenityId = await deleteAmenity(id);

      res.status(200).json({
        message: `Amenity with id ${deletedAmenityId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  notAuthorizedErrorHandler
);

export default router;
