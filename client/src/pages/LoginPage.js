import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {

    const navigate=useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo}=useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        const resp = await fetch('https://my-blog-backend-08uh.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (resp.status === 200) {
            resp.json().then((info)=>{
                setUserInfo(info);
                setRedirect(true);
            })
        } else {
            setRedirect(false);
            alert('Login Failed');
        }
    };

    if (redirect) return navigate('/');
    
    return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}

export default LoginPage