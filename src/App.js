import {useState } from 'react';
import './App.css';
import Post from './Post'; 

function App() {
  const [posts, setPosts] = useState([
    {
      username: "mina4873", 
      caption: "lovelyyy", 
      imageUrl: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
    },
    {
      username: "tunti34", 
      caption: "i love to work with react", 
      imageUrl: "https://images.ctfassets.net/51xdmtqw3t2p/2w0H06U9MYaJNsonXhyD3I/0cd72a4b4e01460bcd7145e984b05c38/Portada_react.jpg?w=1280&q=50"
    },
    {
      username: "lulu00", 
      caption: "uhu", 
      imageUrl: "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      username: "ssussu", 
      caption: "lalala lets sing", 
      imageUrl: "https://images.unsplash.com/photo-1516475429286-465d815a0df7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    }
  ]);


  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
        alt=""/>
      </div>
      <h1>instagram clone by Huong Nguyen</h1>

    {
      posts.map(post => (
        <Post username={post.username} 
        caption={post.caption} 
        imageUrl={post.imageUrl}/>
      ))
    }
    </div>
  );
}

export default App;
