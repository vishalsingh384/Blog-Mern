import React, { useEffect, useState } from 'react'
import Editor from '../components/Editor';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [title, setTitle]=useState('');
    const [summary, setSummary]=useState('');
    const [content, setContent]=useState('');
    const [files, setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);

    const {id}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        fetch('https://my-blog-backend-08uh.onrender.com/post/'+id).then(resp=>resp.json().then(info=>{
            setTitle(info.title);
            setSummary(info.summary);
            setContent(info.content);
        }))
    },[])

    const updatePost=async(e)=>{
        e.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files?.[0]);
        data.set('id',id);

        await fetch('https://my-blog-backend-08uh.onrender.com/post',{
            method:'PUT',
            body:data,
            credentials:'include'
        });

        setRedirect(true);
    }

    if(redirect){
        navigate('/post/'+id);
    }

    return (
        <form onSubmit={updatePost}>
            <input type='title' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            
            <input type='summary' placeholder='Summary' value={summary} onChange={(e)=>setSummary(e.target.value)}/>
            
            <input type='file' name='file' onChange={(e)=>setFiles(e.target.files)}/>
            
            <Editor value={content} setContent={setContent}/>
            
            <button style={{ marginTop: '5px' }}>Update Post</button>
        </form>
    )
}

export default EditPost