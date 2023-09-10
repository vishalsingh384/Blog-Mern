import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'

const IndexPage = () => {
    const [posts,setPosts]=useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
        .then((resp) => {
            resp.json()
            .then((posts) => {
                console.log(posts);
                setPosts(posts);
            })
        })
    }, [])

    return (
        <>
            {posts&&posts.map((item, index)=>{
                return <Posts key={index} {...item}/>
            })}
        </>
    )
}

export default IndexPage