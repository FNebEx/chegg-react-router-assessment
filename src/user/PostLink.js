import React from "react";
import { Link, useParams, useMatch } from "react-router-dom";

/*
  TODO: Change the below to be a link that goes to the specific post route using the post id. Hint: you can use the `useRouteMatch()` hook from "react-router-dom" to get the current URL path
*/

/**
 * Not really sure how to match the URL with what was clicked. 
 */

export const PostLink = ({ post }) => {
  const {userId} = useParams();
  // const match = useMatch(`/users/${userId}/posts`);
  return (
    <li className="list-group-item text-truncate">
      <Link to={`/users/${userId}/posts/${post.id}`} >
        {post.title}
      </Link>
    </li>
  );
};

export default PostLink;
