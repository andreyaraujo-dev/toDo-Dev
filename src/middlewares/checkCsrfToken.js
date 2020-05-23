exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('layouts/404');
  }
  next();
};

// gera um csrf token para os formularios
exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
