class LogoutController {
  async logout(req, res) {
    try {
      // const { authorization } = req.headers;

      // if (!authorization) {
      //   return res.status(401).json({
      //     errors: ['Login required'],
      //   });
      // }

      req.session.destroy();
      // return res.redirect('/login');

      return res.status(200).json({ auth: false, token: null });
    } catch (e) {
      return res.status(401).json({
        errors: ['Token expirado ou inválido'],
      });
    }
  }
}

export default new LogoutController();
