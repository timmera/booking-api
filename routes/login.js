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

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ message: 'Successfully logged in!', token });
});

export default router;
