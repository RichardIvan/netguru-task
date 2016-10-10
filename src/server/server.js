import Router from 'express'
let router = new Router()

router.get('/', (req, res) =>
  res.send('tala api running'))

router.listen(8080, 'localhost', () => console.log('Server running at http://0.0.0.0:80/'))

export default router
