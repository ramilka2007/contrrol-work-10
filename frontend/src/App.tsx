import './App.css';
import Layout from './UI/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts.tsx';
import NewPost from './features/posts/NewPost.tsx';
import FullPost from './features/posts/FullPost.tsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/news/:id" element={<FullPost />} />
        <Route path="/add-new-post" element={<NewPost />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
