import React from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name:"Home",
      slug: "/",
      active: true,
    },{
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
  <header className='rounded-2xl shadow bg-[#d89e9e] sm:w-[80vw] w-[380px]'>
    <Container>
       <nav className='flex items-center '>
        <div className='mr-4'>
          <Link to= "/">
          <Logo width='70px'/>
          </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItems.map((item)=> 
            item.active ?(
            <li key={item.name}>
              <button
               onClick={()=> navigate(item.slug)}
               className='inline-block px-6  duration-200 hover:bg-blue-100 hover:animate-bounce rounded-full'>
                {item.name}
              </button>
            </li>
            ) : null
          )}
          {authStatus && 
          <li>  <LogoutBtn/> </li>
          }
        </ul>
       </nav>
    </Container>
  </header>
  )
}

export default Header
