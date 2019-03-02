const Koa = require('koa')
const app = new Koa()
const port = process.env.PORT || 6666
const serve = require('koa-static');
const path = require('path')
const staticPath = path.join(__dirname, `../dist/`)
const proxyMiddleware = require('./proxy')
app.use(serve(staticPath))
app.use(proxyMiddleware)
app.use( async ( ctx ) => {
  // ctx.body = `try http://localhost:${port}/index.html`
  // ctx.set('Content-Type', 'text/plain')
  // ctx.set('content-encoding', 'gzip')
})
app.listen(port, () => {
  console.log(`> serve statice: ${staticPath}`)
  console.log(`> Listening at http://localhost:${port}\n`)
})
