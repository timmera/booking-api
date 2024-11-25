import express from 'express';
import helmet from 'helmet';
import amenitiesRouter from './routes/amenities.js';

const app = express();
app.use(express.json());
app.use(helmet());

app.use('/amenities', amenitiesRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
