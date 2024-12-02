import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getProperties from '../services/properties/getProperties.js';
// import createProperties from '../services/properties/createProperty.js';
// import updatePropertyById from '../services/properties/updatePropertyById.js';
// import deleteProperty from '../services/properties/deleteProperty.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from '../middleware/badRequestErrorHandler.js';

const router = express.Router();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const properties = await getProperties();
      res.status(200).json(properties);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// router.post(
//   '/',
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const {
//         username,
//         password,
//         name,
//         email,
//         phoneNumber,
//         profilePicture,
//         aboutMe,
//       } = req.body;
//       const newHost = await createHost(
//         username,
//         password,
//         name,
//         email,
//         phoneNumber,
//         profilePicture,
//         aboutMe
//       );
//       res.status(201).json(newHost);
//     } catch (error) {
//       next(error);
//     }
//   },
//   badRequestErrorHandler
// );

// router.get(
//   '/:id',
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const host = await getHostById(id);

//       res.status(200).json(host);
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

// router.put(
//   '/:id',

//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const {
//         username,
//         password,
//         name,
//         email,
//         phoneNumber,
//         profilePicture,
//         aboutMe,
//       } = req.body;

//       const updatedHost = await updateHostById(
//         id,
//         username,
//         password,
//         name,
//         email,
//         phoneNumber,
//         profilePicture,
//         aboutMe
//       );
//       res.status(200).json(updatedHost);
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler,
//   badRequestErrorHandler
// );

// router.delete(
//   '/:id',
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const deletedHostId = await deleteHost(id);

//       res.status(200).json({
//         message: `Host with id ${deletedHostId} was deleted!`,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

export default router;
