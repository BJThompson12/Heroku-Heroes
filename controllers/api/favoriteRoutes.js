const router = require('express').Router();
const path = require('path');
const Favorite = require('../../models/favorite');
// const getFavoriteAnime = require('../../public/js/animeFetch');
const axios = require('axios');
const withAuth = require('../../utils/auth');

//serve the html page
router.get('/', withAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views/favorites.html'));
});

//get all favorites by id
router.get('/:userId', async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({
      where: { user_id: req.params.userId }
    });
    if (!favoriteData.length) {
      res.status(404).json({ message: 'No favorites found for that user.' });
      return;
    }
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE favorite by title
router.delete('/:title', async (req, res) => {
  try {
    console.log(req);
    // must encode it since it was sent with special characters 
    const encodedTitle = req.params.title;
    console.log(encodedTitle);
    // decode to remove the characters
    const decodedTitle = decodeURIComponent(encodedTitle);
    // search for a match and then DELETE
    const favoriteData = await Favorite.destroy({
      where: {
        title: decodedTitle,
      },
    });
    if (!favoriteData) {
      // if no favorite with that title exist
      res.status(404).json({ message: 'No favorite found with that title.' });
      return;
    }
    // response code if delete was successful
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET all favorites
router.get('/', async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({
       //include: [{ model: Category}, {model: Tag}],
    });
    res.status(200).json(favoriteData);
    console.log('Find All SUCCESS');
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE favorite
  router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    try {
      const favoriteData = await Favorite.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!favoriteData) {
        // if no product with that id exist
        res.status(404).json({ message: 'No product found with that ID.' });
        return;
      }
      // response code if delete was successful
      res.status(200).json(favoriteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

  // GET /favorites - retrieve all favorites
  // router.get('/favorites', async (req, res) => {
//     try {
//       const favorites = await Favorite.findAll();
//       let html = '<!DOCTYPE html>\n<html>\n<head>\n<title>My Favorites</title>\n</head>\n<body>\n<h1>My Favorites</h1>\n';
//       favorites.forEach(favorite => {
//         html += `<div class="card">
//                    <img src="${favorite.img_url}" alt="${favorite.title}">
//                    <h2>${favorite.title}</h2>
//                    <p>${favorite.description}</p>
//                  </div>\n`;
//       });
//       html += '</body>\n</html>';
//       res.send(html);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

// there will be no serch function so we wont be searching for single posts
// GET single favorite
// router.get('/:favorite_id', (req, res) => {
//     console.log('api/favorites/:id GET endpoint reached');
// });

