import express from 'express';
import { GoodNews } from '../models/GoodNews.js';
import { User } from '../models/User.js';

export const router = express.Router();

/*
  GET /
  - Most recent entry
  - Table of all entries
  - Create form
*/
router.get('/', async (req, res, next) => {
  try {
    const entries = await GoodNews
      .find()
      .populate('author')
      .sort({ createdAt: -1 });
    const mostRecent = entries[0] || null;
    const users = await User.find().sort({ username: 1 });

    res.render('index', {
      title: 'Good News Machine',
      entries,
      mostRecent, 
      users
    });
  } catch (err) {
    next(err);
  }
});

// CREATE
router.post('/goodnews', async (req, res, next) => {
  try {
    const message = (req.body.message || '').trim();
    const author = req.body.userId;

    if (!message) return res.redirect('/');

    await GoodNews.create({ message, author });
    await User.findByIdAndUpdate(
      author,
      { $inc: { posts: 1 } }
    );

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// VOTE (up or down)
router.post('/goodnews/:id/vote', async (req, res, next) => {
  try {
    const dir = req.body.dir; // "up" or "down"
    const inc = dir === 'down' ? -1 : 1;

    await GoodNews.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: inc } },
      { runValidators: true }
    );

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/seed', async (req, res) => {

  const usernames = [
    'Fiala',
    'Serafino',
    'Lily',
    'Dylan',
    'Shea',
    'Willa',
    'Yolanda',
    'Mhairi',
    'Annika'
  ];

  const users = usernames.map(name => ({
    username: name,
    posts: 0
  }));

  await User.insertMany(users);

  res.send('Users added successfully');

});