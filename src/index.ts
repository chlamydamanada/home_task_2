import express, { Request, Response}  from  'express'
import bodyParser from "body-parser";
import {blogsRouter} from "./routers/blogs_router";
import {postsRouter} from "./routers/posts_router";
import {allDataRouter} from "./routers/all_data_router";

const app = express()
const port = process.env.PORT || 5000
export const auth = require('express-basic-auth')

export const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use('/blogs',blogsRouter)
app.use('/posts', postsRouter)
app.use('/all-data', allDataRouter)

app.get('/', (req:Request, res:Response) => {
    res.send(`Hello user`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})