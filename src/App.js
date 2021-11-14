import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
        alt=""/>
    </div>
      <h1>instagram clone by Huong Nguyen</h1>

    <Post/>
    {/* post */}

    </div>
  );
}

export default App;
