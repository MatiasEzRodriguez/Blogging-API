import express from 'express';
import { json } from 'body-parser';
import { postRouter } from './routes/blogPostRoutes';
import { migrate } from './database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api', postRouter);

migrate().then(() => {
  console.log('Migration completed, starting server...');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export {app}
