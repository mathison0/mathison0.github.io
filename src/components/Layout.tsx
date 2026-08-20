import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            {profile.name}
            <span className="brand__role">{profile.role}</span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '닫기' : '메뉴'}
          </button>

          <nav id="site-nav" className="nav" data-open={menuOpen} aria-label="주 메뉴">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className="nav__link"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
          </p>
          <div className="footer-links">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
      </footer>

      <ScrollRestoration />
    </div>
  )
}
