import express from 'express';
import helmet from 'helmet';
import authMiddleware from './middleware/auth.js';
import amenitiesRouter from './routes/amenities.js';
import loginRouter from './routes/login.js';
import errorHandler from './middleware/errorHandler.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(helmet());

// routes
app.use('/login', loginRouter);
app.use('/amenities', amenitiesRouter);

app.use(authMiddleware);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
