import React from 'react'
import { format } from 'date-fns'
import {Link} from 'react-router-dom'

const Posts = ({ title, summary, cover, createdAt, content, author }) => {
    return (
        <div className="post">
            <div className="image">
                <Link to={'/post/id'}>
                    <img src={`http://localhost:4000/${cover}`} alt='coverImage' />
                </Link>
            </div>
            <div className="texts">
                <Link to={'post/to'}>
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