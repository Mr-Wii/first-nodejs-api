const app = require('./app')
const hostname = '127.0.0.1'
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Serving running at http://${hostname}:${port}/`)
})
