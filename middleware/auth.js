import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!token) {
    return res
      .status(401)
      .json({ message: 'You cannot access this operation without a token!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ message: 'Token has expired! Please create a token again!' });
      }
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    req.user = decoded;

    next();
  });
};

export default authMiddleware;
