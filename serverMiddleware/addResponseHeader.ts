module.exports = (req, res, next) => {
  console.log('servermiddleware:addResponseHeader')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-if-error=60');
  next()
}
