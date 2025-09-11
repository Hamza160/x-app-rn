import config from './config/config'
import express, {type Express} from 'express'

const app: Express = express()



app.listen(config.port, () => console.log(`Server started on port http://localhost:${config.port}`))