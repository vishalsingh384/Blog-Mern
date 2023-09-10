import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePost = () => {

    const { id } = useParams();;
    console.log(id);
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((resp) => {
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
                        <div className='image'>
                            <img src={`http://localhost:4000/${postInfo.cover}`} alt='coverImg' />
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