import React from 'react';
import './Post.css';
import Avatar  from '@material-ui/core/Avatar';

function Post() {
    return (
        <div>
            <h3>username</h3>
            {/* avatar */}
            <Avatar 
            />
            {/* img */}
            <img className="post__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1920px-Instagram_logo_2016.svg.png" alt=""/>
            {/* username + caption */}
            <h4 className="post__text"><strong>username</strong> caption</h4>
        </div>
    )
}

export default Post
