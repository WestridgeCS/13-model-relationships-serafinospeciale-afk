import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { router } from './routes/routes.js';

dotenv.config();

const app = express();

// Body parsing for POST forms
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('static'));

// EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', router);

// Basic error handler (so students see something helpful)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server error. Check terminal for details.');
});

const port = process.env.PORT || 3000;

await mongoose.connect(process.env.MONGODB_URI);
console.log('Connected to MongoDB');

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
