import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import logo from './assets/icons/logo.svg';
import avatar from './assets/images/image 2.svg';
import pencil from './assets/icons/pencil.svg';
import valThorens from "./assets/images/Vol-.Thoren.svg";
import restaurant from "./assets/images/Restauurant.svg";
import cafe from "./assets/pexels-kassandre-pedro-8639743 1 (2).svg";
import bridge from "./assets/images/Long-Bridg.svg";
import tunnel from "./assets/images/Tunnel-.svg";
import mountainHouse from "./assets/images/Mountain-House.svg";


function Logo () {
  return (
    <div className = "header">
      <img src= {logo} alt='Logo'/>
    </div>
  )
}

function Avatar () {
  return (
    <div className="profile-card">
      <img src={avatar} alt='Avatar'/>
    </div>
  )
}

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef()

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  function handleClickOutside(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className='bottom'>
      <footer className="footer">
        <p>
          <span>2025 &copy; Spots</span><br/>
          Ezeonuogu Victoria, AltSchool Tinyuka 2024.
        </p>
      </footer>
    </div>
  )
}

function DisplayCards () {
  const gridAssets = [
  { image: valThorens, title: "Val Thorens" },
  { image: restaurant, title: "Restaurant Terrace" },
  { image: cafe, title: "An Outdoor Cafe" },
  { image: bridge, title: "A Very Long Bridge Over the Forest" },
  { image: tunnel, title: "Tunnel with Morning Light" },
  { image: mountainHouse, title: "Mountain House" }
  ];

  const [imagePreview, setImagePreview] = useState({ image: null, title: "" })
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [newPost, setNewPost] = useState({ image: null, title: "", liked: false })
  const [profile, setProfile] = useState({ name: "Bessie Coleman", title: "Civil Aviator", image: avatar })
  const [likedPosts, setLikedPosts] = useState({})

  function toggleHeart(index) {
    setLikedPosts(prev => {
      const newState = { ...prev, [index]: !prev[index] }
      console.log("Updated likedPosts:", newState)
      return newState;
    });
  }

//   function toggleHeart(index) {
//     setLikedPosts(prev => ({
//       ...prev,
//       [index]: !prev[index] 
//     }));
// }


  return (
    <div className='main-container'>
      <div className='header'>
        <Logo/>
      </div>
      
      <div className='profile-container'>
        <div className="profile-info">
    
          <div className='avatar'>
            <Avatar/>
          </div>

          <div className="bio">
            <h2>{profile.name}</h2>
            <p className="title">{profile.title}</p>
            <a href="javascript:void(0);" className="edit-profile" onClick={(e) => {
              e.preventDefault();
              setShowEditModal(true);
            }}>
              <img src={pencil} alt="pencil" />
              Edit Profile
            </a>

          </div>

          <div className="btn-section">
            <button className="new-post" onClick={() => setShowPostModal(true)}> + New Post</button>
          </div>
        </div>
        
      </div>

      <hr className="profile-divider"/>
      
      
      
      <div className='cards'>
        {gridAssets.map((data, index) => (
          <div key={index} className='card'>
            <img
              src={data.image}
              alt={data.title}
              className='image-cards'
              onClick={() => setImagePreview({ image: data.image, title: data.title })}
              style={{ cursor: 'pointer' }}
            />
            <div className='card-label'>
              <p>{data.title}</p>
              <i
                className={likedPosts[index] ? "fa-solid fa-heart like-btn" : "fa-regular fa-heart like-btn"}
                aria-label="Like button"
                onClick={() => toggleHeart(index)}
              ></i>
            </div>
          </div>
        ))}
      </div>

      <hr className="card-divider" />

      <Modal isOpen={!!imagePreview.image} onClose={() => setImagePreview({ image: null, title: "" })}>
        <div style={{ textAlign: 'center' }}>
          <img src={imagePreview.image} alt="Preview" style={{ width: '100%', borderRadius: '10px' }} />
          <p>{imagePreview.title}</p>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <h3>Edit Profile</h3>
        <input type="text" placeholder="Update name" autoFocus onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        <input type="text" placeholder="Update title" onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
        <input type="file" accept="image/*" onChange={(e) => setProfile({ ...profile, image: URL.createObjectURL(e.target.files[0]) })} />
        <button onClick={() => setShowEditModal(false)}>Save Changes</button>
      </Modal>

      <Modal isOpen={showPostModal} onClose={() => setShowPostModal(false)}>
        <h3>Create a New Post</h3>
        <input type="file" accept="image/*" onChange={(e) => setNewPost({ ...newPost, image: URL.createObjectURL(e.target.files[0]) })} />
        <input type="text" placeholder="Post title" autoFocus onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
        <button onClick={() => {
          console.log("Posting...", newPost);
          setShowPostModal(false);
        }}>Post</button>
      </Modal>
  
    </div>
  )
}


function App() {
  return (
    <div className="card-container">
      <DisplayCards/>
      <Footer/>
    </div>
  );
}

export default App;
