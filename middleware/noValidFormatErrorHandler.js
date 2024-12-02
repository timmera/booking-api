const noValidFormatErrorHandler = (err, req, res, next) => {
  if (err.name === 'NoValidFormat') {
    return res.status(400).json({ message: err.message });
  }

  next(err);
};

export default noValidFormatErrorHandler;
