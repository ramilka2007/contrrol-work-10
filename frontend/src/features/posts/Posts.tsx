import React from 'react';
import {NavLink} from "react-router-dom";

const Posts = () => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <h1>Posts</h1>
            <NavLink to="/add-new-post" className="btn btn-primary">Add new post</NavLink>
        </div>
    );
};

export default Posts;