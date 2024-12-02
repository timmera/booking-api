import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getBookings from '../services/bookings/getBookings.js';
import createBooking from '../services/bookings/createBooking.js';
import getBookingById from '../services/bookings/getBookingById.js';
import updateBookingById from '../services/bookings/updateBookingById.js';
import deleteBooking from '../services/bookings/deleteBooking.js';
import getBookingsByUserId from '../services/bookings/getBookingsByUserId.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from '../middleware/badRequestErrorHandler.js';
import noValidFormatErrorHandler from '../middleware/noValidFormatErrorHandler.js';

const router = express.Router();

router.get(
  '/',
  async (req, res, next) => {
    const userId = req.query.userId;

    try {
      if (userId) {
        const bookings = await getBookingsByUserId(userId);
        return res.status(200).json(bookings);
      } else {
        const bookings = await getBookings();
        res.status(200).json(bookings);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
  noValidFormatErrorHandler,
  badRequestErrorHandler
);

router.post(
  '/',
  authMiddleware,
  async (req, res, next) => {
    try {
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const newBooking = await createBooking(
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );
      res.status(201).json(newBooking);
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
      const booking = await getBookingById(id);

      res.status(200).json(booking);
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
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;

      const updatedBooking = await updateBookingById(
        id,
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );
      res.status(200).json(updatedBooking);
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
      const deletedBookingId = await deleteBooking(id);

      res.status(200).json({
        message: `Booking with id ${deletedBookingId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
