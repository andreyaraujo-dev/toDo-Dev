class LogoutController {
  logout(req, res) {
    req.logout();
    res.redirect('/login');
  }
}

export default new LogoutController();
