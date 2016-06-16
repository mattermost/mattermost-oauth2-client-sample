import auth from '../libs/auth';
import express from 'express';
import passport from 'passport';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    if (!req.user) {
      return res.render('index', { title: 'Mattermost Sample App' });
    }
  
    return res.redirect('/user');
});

router.get('/login', passport.authenticate('oauth2'));

router.get('/oauth/callback', (req, res, next) => {
  passport.authenticate('oauth2', (err, user) => {
    if (err) {
      return next(err);
    }
    if (req.query.error) {
      return res.render('oauth', {
        title: 'Mattermost Sample App',
        error: req.query.error
      });
    }
    if (!user) {
      return res.render('oauth', {
        title: 'Mattermost Sample App',
        error:  'User failed'
      });
    }
    
    req.logIn(user, function(err) {
      if (err) { return next(err); }

      return res.render('oauth', {
        title: 'Mattermost Sample App',
        logged: true
      });
    });
    
  })(req, res, next);
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('user', { 
      title: 'Mattermost Sample App Authenticated',
      user: req.user
    });
  }
  return res.redirect('/');
});

router.post('/client', (req, res) => {
  auth.setUrl(req.body.url);
  return res.json(true);
});

router.get('/logout', (req, res) => {
  req.logOut();
  return res.redirect('/');
});

module.exports = router;
