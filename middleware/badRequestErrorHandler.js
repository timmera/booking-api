const badRequestErrorHandler = (err, req, res, next) => {
  if (err.name === 'BadRequest') {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

export default badRequestErrorHandler;
