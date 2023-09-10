import './App.css';
import Header from './components/Header';
import Layout from './components/Layout';
import Posts from './components/Posts';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePage from './pages/CreatePage';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={
          <RegisterPage/>
        } />
        <Route path='/create' element={<CreatePage/>}/>
      <Route path='/post/:id' element={<SinglePost/>}/>
      </Route>
    </Routes>
  );
}

export default App;
