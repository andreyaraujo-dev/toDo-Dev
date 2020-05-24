class HomeController {
  index(req, res) {
    res.render('home', { message: null });
  }
}

export default new HomeController();
