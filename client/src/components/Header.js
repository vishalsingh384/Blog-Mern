import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {

    // const [username, setUsername] = useState(null);
    const {userInfo, setUserInfo}=useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then((resp) => {
            resp.json().then((info) => {
                setUserInfo(info);
            })
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const logout=()=>{
        fetch('http://localhost:4000/logout',{
            credentials:'include',
            method:'POST'
        })

        setUserInfo(null);
    }

    const username=userInfo?.username;

    return (
        <header>
            <Link to='/' className="logo">MyBlog</Link>
            <nav>
                {username != null ?
                    (
                        <>
                        <a>Welcome {username}</a>
                            <Link to="/create">Create New Post</Link>
                            <a onClick={logout}>Logout</a>
                        </>
                    )
                    :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header