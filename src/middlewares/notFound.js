module.exports = (req, res) => {
  res.status(404).render('error', { title: 'Not Found', message: 'Page not found' });
};
