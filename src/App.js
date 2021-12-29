import {useEffect, useState } from 'react';
import './App.css';
import Post from './Post'; 
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@material-ui/core/Input';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in ...
        console.log(authUser);
        setUser(authUser); 

      } else {
        // user has logged out ...
        setUser(null);
      }
    })
    return () => {
      // perform some cleanup actions... 
      unsubcribe();
    }
  }, [user, username]);

  // UseEffect run a piece of code based on a specific condition

  useEffect( () => {
    db.collection('posts').onSnapshot(snapshot => {
      // every time a new post is added,...
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []); 

  const signUp = (event) => {
    event.preventDefault();
  
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      });
    })
    .catch((error) => alert(error.message));
  }

  return (
    <div className="App">

      <div>
        <Button onClick={handleOpen}>Sign up</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ ...style, width: 400 }}>
            <form className="app__signup">
              <center>
                <img className="app__headerImage" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
                alt=""/>
              </center>  
                <Input type="text" value={username} placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                />
                <Input type="text" value={email} placeholder="emai"
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input type="text" value={password} placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>Sign up</Button>
            </form>
          </Box>
        </Modal>
      </div>

      <div className="app__header">
        <img className="app__headerImage" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
        alt=""/>
      </div>
      <h1>instagram clone by Huong Nguyen</h1>

    {
      posts.map(({id, post}) => (
        <Post key={id} username={post.username} 
        caption={post.caption} 
        imageUrl={post.imageUrl}/>
      ))
    }
    </div>
  );
}

export default App;
