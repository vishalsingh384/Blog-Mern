import React from 'react'
import { format } from 'date-fns'
import {Link} from 'react-router-dom'

const Posts = ({_id, title, summary, cover, createdAt, content, author }) => {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={`https://my-blog-backend-08uh.onrender.com/${cover}`} alt='coverImage' />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">{author.username}</a>
                    <time>{format(new Date(createdAt), 'yyyy-MM-dd')}</time>
                </p>
                <p className="summary">{summary}
                </p>
            </div>
        </div>
    )
}

export default Posts