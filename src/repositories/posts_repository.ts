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
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1);
        return true;
      } else {
        return false;
      }
    }
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
      blogName: blogName || "string",
    };
    posts.push(newPost);
    return newPost;
  },
  updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ) {
    const newPost = posts.find((p) => p.id === id);
    if (newPost) {
      (newPost.title = title),
        (newPost.shortDescription = shortDescription),
        (newPost.content = content),
        (newPost.blogId = blogId),
        (newPost.blogName = blogName || "string");
      return true;
    } else {
      return false;
    }
  },
  deleteAllPost() {
    posts.splice(0, posts.length);
    return true;
  },
};
