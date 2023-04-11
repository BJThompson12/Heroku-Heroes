const router = require('express').Router();
const path = require('path');
const Favorite = require('../../models/favorite');
const { log } = require('console');
const { body, validationResult } = require('express-validator');
const withAuth = require('../../utils/auth');

//serve the html page
router.get('/', withAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views/homePage.html'));
});

router.post('/', 
  body('title').notEmpty(),
  body('img_url').isURL(),
  body('user_id').isInt(),
  async (req, res) => {
    console.log(req.body);
    try {
      console.log(req.body);
      const { title, description, img_url, user_id } = req.body;

      const newFavorite = await Favorite.create({
        title,
        description,
        img_url,
        user_id,
      });
      res.status(201).json(newFavorite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);


module.exports = router;