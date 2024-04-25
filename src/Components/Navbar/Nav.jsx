import React, { useContext } from 'react'
import "./Nav.css"
import { Link, NavLink} from 'react-router-dom'
import UserContext from '../../Context/UserContext';
import PostContext from '../../Context/PostContext';

const navItems = [
  { page:"home", link:"/"},
  { page:"profile", link:"/profile"},
]

function Nav() {
  const { user } = useContext(UserContext);
  const {logout} = useContext(PostContext)

  
  return (
    <>
      <nav className='wrapper'>
        <h1 className='nav'>BLOG</h1>
        <ul>
          {navItems.map((ele) =>(
            <NavLink key={ele.link} to={ele.link}>
              <li>{ele.page}</li>
            </NavLink>
          ))}
        </ul>
        <div>
          {user ? (
            <div className='dropdown'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJmE1oJBAYuVBVQ2fan32pAk80sP-JLQ2LWmcIVSz7g&s'
                  className='logo'/>
                <div className='dropdown-content'> 
                  <a onClick={logout}>LOGOUT</a>
                </div>
            </div>
            
          ):(
            <Link to="/login">
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          )}
        </div>


      </nav>
    </>
  )
}

export default Nav
