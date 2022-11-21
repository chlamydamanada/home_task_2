import {NextFunction, Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs_repository";
import {body, validationResult, ValidationError} from "express-validator";


export const blogsRouter = Router ();


export const basAuthMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const log = "Basic YWRtaW46cXdlcnR5"
    if (req.headers.authorization !== log){
        res.send(401);
    } else {
        next();
    }
}

const nameValidation = body('name').isString().trim().isLength({min:1, max:15}).withMessage("name is not correct")
const descriptionValidation = body('description').isString().trim().isLength({min:1, max:500}).withMessage("description is not correct")
const websiteValidation = body('websiteUrl').isString().trim().isLength({min:1, max:100}).isURL({ protocols: ['https'] }).withMessage("website is not correct")
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

blogsRouter.get('/', (req:Request, res:Response) => {
    const allBlogs = blogsRepository.findBlogs();
    res.status(200).send(allBlogs)
})
blogsRouter.get('/:id', (req:Request, res:Response) => {
    let blog = blogsRepository.findBlog(req.params.id)
    if(blog){
        res.status(200).send(blog)
    } else {
        res.send(404)
    }
})
blogsRouter.delete('/:id',
    basAuthMiddleware,
    (req:Request, res:Response) => {
    let isDel = blogsRepository.deleteBlog(req.params.id)
        if (isDel){
           res.send(204)
        } else {
            res.send(404)
    }
})
blogsRouter.post('/',
    basAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteValidation,
    inputValMiddleware,
    (req:Request, res:Response) => {
    const newBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
       res.status(201).send(newBlog)
})
blogsRouter.put('/:id',
    basAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteValidation,
    inputValMiddleware,
    (req:Request, res:Response) => {
    const isNewBlog = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (isNewBlog){
        res.send(204)
        return;
    } else {
        res.send(404)
        return;
    }
})
