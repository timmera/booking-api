import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getProperties from '../services/properties/getProperties.js';
import createProperty from '../services/properties/createProperty.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import updatePropertyById from '../services/properties/updatePropertyById.js';
import deleteProperty from '../services/properties/deleteProperty.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from '../middleware/badRequestErrorHandler.js';

const router = express.Router();

router.get(
  '/',
  async (req, res, next) => {
    const { location, pricePerNight, amenities } = req.query;
    try {
      const properties = await getProperties(
        location,
        pricePerNight,
        amenities
      );
      res.status(200).json(properties);
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
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedRoomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
      } = req.body;
      const newProperty = await createProperty(
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedRoomCount,
        bathRoomCount,
        maxGuestCount,
        rating
      );
      res.status(201).json(newProperty);
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
      const property = await getPropertyById(id);

      res.status(200).json(property);
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
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedRoomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
      } = req.body;

      const updatedProperty = await updatePropertyById(
        id,
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedRoomCount,
        bathRoomCount,
        maxGuestCount,
        rating
      );
      res.status(200).json(updatedProperty);
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
      const deletedPropertyId = await deleteProperty(id);

      res.status(200).json({
        message: `Property with id ${deletedPropertyId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
