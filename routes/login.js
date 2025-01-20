import { Router } from 'express';
import getUsers from '../services/users/getUsers.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  const users = await getUsers();
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  const expirationTime = Math.floor(Date.now() / 1000) + 30 * 60; // 30 minutes

  const token = jwt.sign({ userId: user.id, exp: expirationTime }, secretKey);

  try {
    const token = jwt.sign({ userId: user.id, exp: expirationTime }, secretKey);
    return res.status(200).json({
      message: 'Successfully logged in!',
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating token', error: error.message });
  }
});

export default router;
