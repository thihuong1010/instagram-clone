import {useEffect, useState } from 'react';
import './App.css';
import Post from './Post'; 
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@material-ui/core/Input';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
  const [openSignIn, setOpenSignIn] = useState(false);
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
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="App"> 
      <div >
        
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
                <Input type="text" value={email} placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input type="text" value={password} placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>Sign up</Button>
            </form>
          </Box>
        </Modal> 

        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)} 
        >
          <Box sx={{ ...style, width: 400 }}>
            <form className="app__signup">
              <center>
                <img className="app__headerImage" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
                alt=""/>
              </center>  
                <Input type="text" value={email} placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input type="text" value={password} placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signIn}>Sign in</Button>
            </form>
          </Box>
        </Modal>
      </div>

      <div className="app__header">
        <img className="app__headerImage" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
        alt=""/>
        { user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
            <Button onClick={handleOpen}>Sign up</Button>
          </div>
        )
        }
      </div>
      <div className="app__posts">
        {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} 
          caption={post.caption} 
          imageUrl={post.imageUrl}/>
        ))
        }
      </div>
      <InstagramEmbed
        url='https://www.instagram.com/p/CYRVUxnFAFb/'
        clientAccessToken='440663001042149|67e0c6cef3bb3766b949c32a204b62c4'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h4>Sorry you need to login to upload</h4> 
      )}
    </div>
    
  );
}

export default App;
