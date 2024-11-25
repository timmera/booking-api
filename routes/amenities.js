import express from 'express';
import getAmenities from '../services/amenities/getAmenities.js';
import createAmenity from '../services/amenities/createAmenity.js';
import getAmenityById from '../services/amenities/getAmenityById.js';
import updateAmenityById from '../services/amenities/updateAmenityById.js';
import deleteAmenity from '../services/amenities/deleteAmenity.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const amenities = await getAmenities();
  res.status(200).json(amenities);
});

// router.post('/', authMiddleware, async (req, res) => {
//   const { title, author, isbn, pages, available, genre } = req.body;
//   const newBook = await createBook(
//     title,
//     author,
//     isbn,
//     pages,
//     available,
//     genre
//   );
//   res.status(201).json(newBook);
// });

// router.get(
//   '/:id',
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const book = await getBookById(id);

//       res.status(200).json(book);
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

// router.put(
//   '/:id',
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { title, author, isbn, pages, available, genre } = req.body;
//       const updatedBook = await updateBookById(
//         id,
//         title,
//         author,
//         isbn,
//         pages,
//         available,
//         genre
//       );
//       res.status(200).json(updatedBook);
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

// router.delete(
//   '/:id',
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const deletedBookId = await deleteBook(id);

//       res.status(200).json({
//         message: `Book with id ${deletedBookId} was deleted!`,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

export default router;
