module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('errors', 'Please log in to view that resource');
    return res.redirect('/login');
  },
  forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/dashboard');
  },
};
