import express from 'express';
import { join } from 'path';
const app = express();

app.use('/', express.static(join(__dirname, 'downloads')));

console.log('Server is running on port ', 3000);
export default app;
