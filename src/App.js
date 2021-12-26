import {useEffect, useState } from 'react';
import './App.css';
import Post from './Post'; 
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  // UseEffect run a piece of code based on a specific condition

  useEffect( () => {
    db.collection('posts').onSnapshot(snapshot => {
      // every time a new post is added,...
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, []); 

  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
        alt=""/>
      </div>
      <h1>instagram clone by Huong Nguyen</h1>

    {
      posts.map((post, index) => (
        <Post key={index} username={post.username} 
        caption={post.caption} 
        imageUrl={post.imageUrl}/>
      ))
    }
    </div>
  );
}

export default App;
