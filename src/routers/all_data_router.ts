import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs_repository";
import {postsRepository} from "../repositories/posts_repository";


export const allDataRouter = Router ();


allDataRouter.delete('/', (req:Request, res:Response) => {
    let blogDel = blogsRepository.deleteAllBlogs()
    let postDel = postsRepository.deleteAllPost()
    if (blogDel && postDel) {
        res.send(204)
    }
})