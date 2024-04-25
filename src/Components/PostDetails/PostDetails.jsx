import { useEffect, useState } from 'react'
import './PostDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function PostDetails() {
  const {id} = useParams();
  const [post,setPost] = useState({})

  useEffect(()=>{
    axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res=> setPost(res.data))
        .catch(err=>console.log(err))
  })
  return (
    <>
      <div>
        <div className='text'>
          <h1>Liked Post Details</h1>
        </div>
        <div>
          {post.body}
        </div>
        </div>
    </>
  )
}
export default PostDetails