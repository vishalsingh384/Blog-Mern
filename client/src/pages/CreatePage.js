import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/Editor';

const CreatePage = () => {

    const [title, setTitle]=useState('');
    const [summary, setSummary]=useState('');
    const [content, setContent]=useState('');
    const [files, setFiles]=useState('');

    const navigate=useNavigate();

    const createNewPost=async (e)=>{
        const data=new FormData();
        data.set('title', title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files?.[0]);

        e.preventDefault();
        const resp=await fetch('http://localhost:4000/post',{
            method:'POST',
            body:data,
            credentials:'include',
        })

        if(resp.ok){
            return navigate('/');
        }

    }
    return (
        <form onSubmit={createNewPost}>
            <input type='title' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            
            <input type='summary' placeholder='Summary' value={summary} onChange={(e)=>setSummary(e.target.value)}/>
            
            <input type='file' name='file' onChange={(e)=>setFiles(e.target.files)}/>
            
            <Editor value={content} setContent={setContent}/>
            
            <button style={{ marginTop: '5px' }}>Create Post</button>
        </form>
    )
}

export default CreatePage