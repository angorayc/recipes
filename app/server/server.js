import Express from 'express'
import path from 'path'
import compression from 'compression'
import clearRequireCacheOnChange from './lib/clearRequireCacheOnChange'

let server = new Express()
let port = process.env.PORT || 3000

server.use(compression())

if (process.env.NODE_ENV === 'production') {
  server.use(Express.static(path.join(__dirname, '../..', 'public')))
} else {
  server.use('/assets', Express.static(path.join(__dirname, '..', 'assets')))
  server.use(Express.static(path.join(__dirname, '../..', 'dist/css')))

  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require(path.join(__dirname, '../..', 'webpack.config'))
  const webpack = require('webpack')
  const compiler = webpack(webpackConfig)

  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: false
    }
  }))
  server.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr'
  }))

  clearRequireCacheOnChange({ rootDir: path.join(__dirname, '..') })
}

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')

// mock apis
server.get('/api/recipes', (req, res)=> {
  let { getRecipes } = require('./mock_api')
  let { page } = req.query
  let recipes = getRecipes(page)
  res.send(recipes)
})

// server.get('/api/users/:id', (req, res)=> {
//   let { getUser } = require('./mock_api')
//   res.send(getUser(req.params.id))
// })
server.get('/api/recipes/:id', (req, res)=> {
  let { getRecipe } = require('./mock_api')
  let recipe = getRecipe(req.params.id)
  if (recipe) {
    res.send(recipe)
  } else {
    res.status(404).send({ reason: 'recipe not found' })
  }
})

server.get('*', (req, res, next)=> {
  require('./middlewares/universalRenderer').default(req, res, next)
})
server.use((err, req, res, next)=> {
  console.log(err.stack)
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...")
})

console.log(`Server is listening to port: ${port}`)
server.listen(port)
