import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

const SinglePost = () => {

    const { userInfo } = useContext(UserContext);

    const { id } = useParams();;
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`https://my-blog-backend-08uh.onrender.com/post/${id}`)
        .then((resp) => {
            resp.json().then((info) => {
                setPostInfo(info);
            })
        })
    }, [])

    return (
        <>
            {
                postInfo
                    ?
                    <div className='post-page'>
                        <h1>
                            {postInfo.title}
                        </h1>
                        <time>{format(new Date(postInfo.createdAt), 'yyyy-MM-dd')}</time>
                        <div className='author'>by @{postInfo.author.username}</div>
                        {userInfo.id === postInfo.author._id &&
                            (
                                <Link to={`/edit/${postInfo._id}`}>
                                    <div className='edit-row'>
                                        <a className='edit-btn'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            Edit this post</a>
                                    </div>
                                </Link>
                            )
                        }
                        <div className='image'>
                            <img src={`https://my-blog-backend-08uh.onrender.com/${postInfo.cover}`} alt='coverImg' />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                    </div>
                    :
                    ''
            }
        </>
    )
}

export default SinglePost