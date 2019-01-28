const mongoose = require('mongoose')
const dbConfig = {
  url: 'mongodb://localhost:27017/eru',
}

mongoose.Promise = global.Promise

mongoose
  .connect(
    dbConfig.url,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('connected')
  })
  .catch(err => {
    console.log('cant connect', err)
    process.exit()
  })
