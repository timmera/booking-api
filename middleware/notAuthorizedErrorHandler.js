const notAuthorizedErrorHandler = (err, req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'No Authorization header found.' });
  } else if (!authorizationHeader.startsWith('Bearer')) {
    return res
      .status(401)
      .json({ message: 'Authorization header has wrong value.' });
  } else {
    res.status(401).json({ message: 'You are not authorized!' });
  }
  next(err);
};

export default notAuthorizedErrorHandler;
