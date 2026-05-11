const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  const metodosPermitidos = ['GET', 'HEAD', 'OPTIONS']

  if (!metodosPermitidos.includes(req.method)) {
    return res.status(405).json({
      erro: 'Método não permitido'
    })
  }

  next()
})

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})

module.exports = server
