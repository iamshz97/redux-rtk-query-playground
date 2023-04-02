import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPostRequest, removePost } from "./store/posts/actions";
import { Post } from "./store/posts/types";
import "./App.css";

function App(): JSX.Element {
  const [newPost, setNewPost] = useState<Post>({
    id: 1,
    title: "",
    content: "",
    author: "",
    publishedAt: new Date(),
    tags: [],
  });

  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.post.posts);

  useEffect(() => {
    dispatch(fetchPostRequest());
  }, [dispatch]);

  const handleAddPost = (): void => {
    dispatch(addPost(newPost));
    setNewPost({
      ...newPost,
      id: newPost.id + 1,
      title: "",
      content: "",
      author: "",
      publishedAt: new Date(),
      tags: [],
    });
  };

  const handleRemovePost = (post: Post): void => {
    dispatch(removePost(post));
  };

  return (
    <div className="App">
      <header>
        <h1>Redux Add/ Remove Posts</h1>
      </header>
      <main>
        <section className="new-post-section">
          <h2>Add a new post</h2>
          <div className="card">
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />

              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                placeholder="Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />

              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                placeholder="Author"
                value={newPost.author}
                onChange={(e) =>
                  setNewPost({ ...newPost, author: e.target.value })
                }
              />

              <button onClick={handleAddPost}>Add post</button>
            </form>
          </div>
        </section>
        <section className="all-posts-section">
          <h2>All posts</h2>
          <div className="card-list">
            {posts.map((post: Post) => (
              <div className="card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>
                  <span>By </span>
                  {post.author}
                </p>
                <p>
                  <span>Published on </span>
                  {post.publishedAt}
                </p>
                <div>
                  {post.tags.map((tag: string) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => handleRemovePost(post)}>Remove</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>
      </footer>
    </div>
  );
}

export default App;
