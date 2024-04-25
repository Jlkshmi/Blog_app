import React, { useContext, useState } from 'react'
import UserContext from '../../Context/UserContext'
import PostContext from '../../Context/PostContext'
import SinglePost from '../Blogs/SinglePost/SinglePost'
import "./profile.css"
import { Link } from 'react-router-dom'

function Profile() {
  const { user } = useContext(UserContext)
  const { posts } = useContext(PostContext)
  const [likedPost] = useState(
    posts.filter((post) => post.likes.includes(user.id))
  );
  const [savedPost] = useState(
    posts.filter((post) => post.saved.includes(user.id))
  );
  return (
        <>
        <div className='profile-post-Totalwrapper' >
    <div>
      {likedPost.map((post)=>
      <div className='profile-post'>
      <div className='profile-post-wrapper'>
      
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <Link to={`/postdetails/${post.id}`}>Show More</Link>
      </div>
      </div>
      )}
    </div>
    <div>
      {savedPost.map((post)=>
      <div className='profile-post'>
        <div className='profile-post-wrapper'>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <Link>Show More</Link>
        </div>
      </div>
      )}
    </div>
    </div>
    </>
  );
}

export default Profile