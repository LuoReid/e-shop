// Reify allow us to load files that use 'import/export' syntax
// inside the node js environment
require('reify')

const express = require('express')
const { default: langs } = require('./src/i18n')
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)
const templatePath = resolve('./index.template.html')

// Create Express server app
const server = express()

// Vue bundle renderer
let renderer
// In development: wait for webpack compilation
// when receiving a SSR request
let readyPromise

if (isProd) {
  // TODO production
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    clientManifest,
  })
} else {
  // TODO development
  const setupDevServer = require('./server.dev')
  readyPromise = setupDevServer({
    server,
    templatePath,
    onUpdate: (bundle, options) => {
      renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        ...options,
      })
    }
  })
}

// Serve static files
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
})

// Serve dist files
server.use('/dist', serve('./dist', true))

// Render the Vue app using the bundle renderer
function renderApp(req, res) {
  // TODO render
  const context = {
    url: req.url,
    locale: req.acceptsLanguages(langs) || 'en',
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
    res.send(html)
  })
}

// Process SSR requests
let ssr
if (isProd) {
  ssr = renderApp
} else {
  // In development: wait for webpack compilation
  // when receiving a SSR request
  ssr = (req, res) => {
    readyPromise.then(() => renderApp(req, res)).catch((err) => {
      console.error(err)
    })
  }
}
server.get('*', ssr)

// Listening
const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
