interface IPosts {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}
let posts: IPosts[] = [];

export const postsRepository = {
  findPosts() {
    return posts;
  },
  findPost(id: string) {
    let post = posts.find((p) => p.id === id);
    return post;
  },
  deletePost(id: string) {
    const deletedPost = posts.filter((post) => {
      return post.id !== id;
    });
    posts = deletedPost;
    return posts;
  },
  createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ) {
    const newPost: IPosts = {
      id: new Date().toISOString(),
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: blogName,
    };
    posts.push(newPost);
    return newPost;
  },
  updatePost(
    newPost: IPosts,

    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    newPost.title = title;
    newPost.shortDescription = shortDescription;
    newPost.content = content;
    newPost.blogId = blogId;
    return newPost;
  },
  deleteAllPost() {
    posts.splice(0, posts.length);
    return true;
  },
};
