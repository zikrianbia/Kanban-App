const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)
app.listen(port, _=> console.log(`this app is listening at http://localhost:${port}`))