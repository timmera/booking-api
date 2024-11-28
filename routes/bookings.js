import express from 'express';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import notAuthorizedErrorHandler from '../middleware/notAuthorizedErrorHandler.js';
import getBookings from '../services/bookings/getBookings.js';
import createBooking from '../services/bookings/createBooking.js';
import getBookingById from '../services/bookings/getBookingById.js';
import updateBookingById from '../services/bookings/updateBookingById.js';
import deleteBooking from '../services/bookings/deleteBooking.js';
import getBookingsByUserId from '../services/bookings/getBookingsByUserId.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const userId = req.query.userId;

  try {
    if (userId) {
      // Verify if the userId is correct format
      if (!/^[0-9a-fA-F-]{36}$/.test(userId)) {
        return res.status(400).json({ message: 'Invalid userId format' });
      }
      const bookings = await getBookingsByUserId(userId);
      // Check if any booking belongs to the provided userId
      if (!bookings.some((booking) => booking.userId === userId)) {
        return res.status(404).json({ message: 'userId not found' });
      }
      if (!bookings || bookings.length === 0) {
        return res
          .status(404)
          .json({ message: 'No bookings found for this user' });
      }
      return res.status(200).json(bookings);
    } else {
      const bookings = await getBookings();
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }
      res.status(200).json(bookings);
    }
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
  notAuthorizedErrorHandler
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
  notFoundErrorHandler,
  notAuthorizedErrorHandler
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

      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ message: 'Bad Request: Missing or empty request body' });
      }

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
  notAuthorizedErrorHandler
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
  notFoundErrorHandler,
  notAuthorizedErrorHandler
);

export default router;
