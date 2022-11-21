import {NextFunction, Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts_repository";
import {body, ValidationError, validationResult} from "express-validator";
import {basAuthMiddleware} from "./blogs_router";



export const postsRouter = Router ();

const blogIdValidation = body ('blogId').isString().trim().isLength({min:1}).withMessage("blogId is not correct")
const titleValidation = body('title').isString().trim().isLength({min:1, max:30}).withMessage("title is not correct")
const shortDesValidation = body('shortDescription').isString().trim().isLength({min:1, max:100}).withMessage("shortDescription is not correct")
const contentValidation = body('content').isString().trim().isLength({min:1, max:1000}).withMessage("content is not correct")
const inputValMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
        return ({message:msg, field :param});
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        res.status(400).json({errorsMessages:result.array()})
    } else {
        next();
    }
}



postsRouter.get('/', (req:Request, res:Response) => {
    const allPosts = postsRepository.findPosts()
    res.status(200).send(allPosts)
})
postsRouter.get('/:id', (req:Request, res:Response) => {
    let post = postsRepository.findPost(req.params.id)
    if(post){
        res.status(200).send(post)
    } else {
        res.send(404)
    }
})
postsRouter.delete('/:id',
    basAuthMiddleware,
    (req:Request, res:Response) => {
    const isDel = postsRepository.deletePost(req.params.id)
       if (isDel){
          res.send(204)
       } else {
           res.send(404)
    }
})
postsRouter.post('/',
    basAuthMiddleware,
    blogIdValidation,
    titleValidation,
    shortDesValidation,
    contentValidation,
    inputValMiddleware,
    (req:Request, res:Response) => {
    const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
     res.status(201).send(newPost)
})
postsRouter.put('/:id',
    basAuthMiddleware,
    blogIdValidation,
    titleValidation,
    shortDesValidation,
    contentValidation,
    inputValMiddleware,
    (req:Request, res:Response) => {
    const isUpD = postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (isUpD){
            res.send(204)
        } else {
        res.send(404)
        }
})