import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="py-4 bg-gradient-to-r from-blue-400 to-pink-400 shadow-lg sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 text-white font-semibold text-lg rounded-lg transition duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 hover:text-black shadow-md"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout Button for Authenticated Users */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
