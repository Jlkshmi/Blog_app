
import React, { useContext,  useState } from 'react'
import "./SinglePost.css"
import PostContext from '../../../Context/PostContext'
import UserContext from '../../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

function SinglePost({ post }) {
  const [PostComment, setPostComment] = useState([])
  const [isShow, setIsShow] = useState(false)
  const { handleLike, handleSave,addComment } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [commentOption,setCommentOption] =useState(false)
  const [inputValue,setInputValue] = useState("")

 
  return (
    <div className='post-card'>
      <h1>{post.title}</h1>
      <p className='text-wrapper'>{post.description}</p>
      <img  className= 'image-size' src={post.image}/>
      <hr />
      <div className='icon'>
        <i onClick={() => handleLike(user?.id, post)}
          className={`${post.likes.includes(user?.id)
            ? "fa-solid fa-thumbs-up like"
            : "fa-solid fa-thumbs-up"
            }`}
          title={post.likes?.includes(user?.id) ? "dislike" : "like"}
        ></i>
        <div>   
          <i className="fa-solid fa-comment" 
          onClick={() => { 
            setIsShow(!isShow)
            setCommentOption(!commentOption)
        }}></i>
        </div>
        <i onClick={() => handleSave(user?.id, post)}
          className={`${post.saved?.includes(user?.id)
            ? "fa-solid fa-bookmark save"
            : "fa-solid fa-bookmark "
            }`}
        ></i>
       
      </div>
      {commentOption && (
        <div>
        <input 
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        /> 
        <button 
        onClick={() =>{addComment(post.id, { user:user.username,text:inputValue})}}
        >
          Add</button> 
        </div>
      )}
      <hr />
      {isShow && (
        <div>{post.comments.map((comment) => (
          <div>
            <h3>{comment.user}</h3>
            <p>{comment.text}</p>
            <hr />

          </div>
        ))}
          <span onClick={() => setIsShow(false)}>show less</span>
        </div>
      )}
    </div>
  )
}

export default SinglePost;
