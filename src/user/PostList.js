import React, { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import PostLink from "./PostLink";

/*
  TODO: Update the below so that the components show on the appropriate route.
  
  Hint: you can use the `useParams()` hook from "react-router-dom" to get the userId

  The <NoPostSelectedMessage /> component should show up on the following route:
  /users/:userId/posts

  The <Post /> component should show up on the following route:
  /users/:userId/posts/:postId
*/

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          { signal: abortController.signal }
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
          throw error;
        }
      }
    }

    loadData();
    return () => {
      abortController.abort();
    };
  }, [userId]);

  // I have no clue why this got rid of the map errors in the test. 
  const postLinks = Array.isArray(posts) && posts.map((post) => (
      <PostLink key={post.id} userId={post.userId} post={post} />
    ));

  return (
    <div className="row pt-2">
      <div className="col-3">
        <ul className="list-group">{postLinks}</ul>
      </div>
      <div className="col-9">
        {/* <NoPostSelectedMessage /> */}
        {/* <Post posts={posts} /> */}
        {/* I think this needs to be an outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default PostList;
