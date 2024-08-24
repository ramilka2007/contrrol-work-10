import './App.css';
import Layout from "./UI/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Posts from "./features/posts/Posts.tsx";
import NewPost from "./features/posts/NewPost.tsx";

const App = () => {
  return (<Layout>
    <Routes>
      <Route path="/" element={<Posts/>}/>
      <Route path="/add-new-post" element={<NewPost/>}/>
    </Routes>
  </Layout>);
};

export default App;
