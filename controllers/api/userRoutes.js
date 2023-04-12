const router = require('express').Router();
const { User, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');

// GET all users
// router.get('/', (req, res) => {
//     console.log('api/users GET endpoint reached');
// });

// NEW POST Create a new USER on SIGNUP page //

router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password 
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = dbUserData;
      res.status(200).json({ message: "You are now logged in!", user: dbUserData });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----------------------------------------- //


// NEW POST Create a new USER on LOGIN page //

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,  
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'DB issue Incorrect email or password. Please try again!'});
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'password issue Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ---------------------------------------- //

// Logout

router.post('/logout', (req, res) => {
  console.log('Session before destroy:', req.session);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      console.log('Session after destroy:', req.session);
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// POST a login page
router.post('/login', async (req, res) => {
    console.log('reached api/userroutes/login');
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email });
      if (!user || user.password !== password) {
        throw new Error('Invalid login credentials');
      }
      res.status(200).send({ message: 'Login successful' });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });

// GET all favorites from a SINGLE user
router.get('/:userId/favorites', async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    try {
      const favorites = await user.getFavorites();
      res.status(200).json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// GET single user
router.get('/:user_id', (req, res) => {
    console.log('api/users/:id GET endpoint reached');
});

// DELETE a user
router.delete('/:user_id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;