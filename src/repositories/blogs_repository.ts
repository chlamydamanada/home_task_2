 let blogs = [
    {   id: '1',
        name: 'Nick',
        description: 'valid string',
        websiteUrl: 'https://haha'
    },
    {
        id: '2',
        name: 'Bob',
        description: 'valid string',
        websiteUrl: 'https://hey'
    }
];


export const blogsRepository = {

    findBlogs(){
       return blogs;
   } ,
    findBlog(id: string){
        let blog = blogs.find(b => b.id === id)
        return blog;
    },
    deleteBlog(id: string) {
        const deletedBlog = blogs.filter(blog => {
            return blog.id !== id
        })
        blogs = deletedBlog
        return blogs
        },
    createBlog(name : any , description: any, websiteUrl: any){
        const newBlog = {
            id: new Date().toISOString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
        return newBlog;
    },
    updateBlog(id: string, name: string, description: string, websiteUrl: string ){
        const newBlog = blogs.find(b => b.id === id)
        if (newBlog){
            newBlog.name = name,
            newBlog.description = description,
            newBlog.websiteUrl = websiteUrl
            return true;
        } else {
            return false;
        }

    },
    deleteAllBlogs(){
        blogs.splice(0,blogs.length)
        return true;
    }
}

















